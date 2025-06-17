import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import jsonwebtoken from "jsonwebtoken";
import sendMail from './mailer.js';
import bcrypt from 'bcryptjs';

const app= express();
const PORT= 3000;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const verifyTokenMiddleware = (req, res, next) => { 
    const token = req.headers.authorization?.split(' ')[1];
    const secretKey="h8u5896utri3i90a(%(Tfi*(%)))";
    if (!token) return res.status(403).json({  
        msg: "No token present" 
    }); 
    try { 
        const decoded = jsonwebtoken.verify(token,  
            secretKey); 
        req.user = decoded; 
    } catch (err) { 
        return res.status(401).json({  
            msg: "Invalid Token" 
        }); 
    } 
    next(); 
}; 

const users={}
const passwords={}
const tokens={}
const payedBills={}
const pendingBills={}
const dueBills=[]
const admin={username:'12345678', password:'12345678'};

app.post('/login',async(req, res)=>{
    const username= req.body.username;
    const password= req.body.password;
    if(admin.username===username){
        if(admin.password===password){
            const secretKey="h8u5896utri3i90a(%(Tfi*(%)))";
            const payload={  // creating a payload for token
                userId:username,
                password:password
            }
            const token = jsonwebtoken.sign(payload, secretKey); // token
            admin[token]=token;
            Object.keys(pendingBills).map((user)=>{
                var changedBill=[]
                pendingBills[user].map((bill)=>{
                    if(new Date(bill.dueDate)>=new Date()){
                        bill.penalty=bill.penalty+ 200;
                        changedBill.push(bill);
                        dueBills.push(bill);
                    }
                    else{
                        changedBill.push(bill);
                    }
                })
                pendingBills[user]=changedBill;
            })
            res.json({status:'success',type:'admin', payedBills:payedBills, pendingBills:pendingBills, users:users, token:token, dueBills:dueBills})
        }
        else{
            res.json({status:'failure', error:'username or password is incorrect'})
        }
    }
    else if(users[username]){
        const isMatch = await bcrypt.compare(password, passwords[username]);
        if(isMatch){
            sendMail(users[username].mail, 'Login Alert', 'You have been Loggedin to EBS Account')
            const secretKey="h8u5896utri3i90a(%(Tfi*(%)))";
            const payload={  // creating a payload for token
                userId:username,
                password:password
            }
            const token = jsonwebtoken.sign(payload, secretKey); // token
            tokens[username]=token;
            res.json({status:'success',type:'user', payedBills:payedBills[username], pendingBills:pendingBills[username], token:token, profile:users[username]})
        }
        else{
            res.json({status:'failure', error:'username or password is incorrect'})
        }
    }
    else{
        res.json({status:'failure', error:"user don't exist"})
    }
})

app.post('/ConsumerSignUp', async(req, res)=>{
    const name= req.body.name;
    const mobile= req.body.mobile;
    const connectionNo= req.body.connectionNo;
    const mail= req.body.mail;
    const aadharNo= req.body.aadharNo;
    const password= req.body.password;
    if(users[connectionNo]){
        res.json({status:'failure', error:'User already exists'})
    }
    else{
        const hashedPassword = await bcrypt.hash(password, 10);
        users[connectionNo]={username:connectionNo, name:name, mobile:mobile, mail:mail, aadhar:aadharNo}; 
        passwords[connectionNo]=hashedPassword;
        const secretKey="h8u5896utri3i90a(%(Tfi*(%)))";
        const payload={  // creating a payload for token
            userId:connectionNo,
            password:hashedPassword
        }
        const token = jsonwebtoken.sign(payload, secretKey); // token
        tokens[connectionNo]=token;
        payedBills[connectionNo]=[]
        pendingBills[connectionNo]=[]
        sendMail(mail, 'Welcome to EBS', `Your username:${connectionNo} and password is ${password}`)
        res.json({status:'success', payedBills:payedBills[connectionNo], pendingBills:pendingBills[connectionNo], token:token, profile:users[connectionNo]});
    }
})

app.post('/payBill', verifyTokenMiddleware, (req, res)=>{
    const bill= req.body.bill;
    const connectionNo= req.body.connectionNo;
    const currentDate = new Date().toISOString().split('T')[0];
    const id= `TXN${new Date().getTime()}`;
    payedBills[connectionNo].push({id:id, billNumber:bill.billNumber, paidDate:currentDate, status:'Paid', amount:bill.amount, rate:bill.rate, units:bill.units, penalty:bill.penalty});
    pendingBills[connectionNo]=pendingBills[connectionNo].filter((b)=>b.billNumber!==bill.billNumber);
    res.json({status:'success', payedBills:payedBills[connectionNo], pendingBills:pendingBills[connectionNo]});
})

app.post('/generateBill', verifyTokenMiddleware, (req, res)=>{
    const bill= req.body.bill;
    const BillNumber= `BILL${new Date().getTime()}`;
    if(pendingBills[bill.connectionNo]){
        pendingBills[bill.connectionNo].push({billNumber:BillNumber, connectionNo: bill.connectionNo, units:bill.units, rate:bill.rate, amount:bill.amount, date:bill.currentDate, dueDate:bill.formattedDueDate, penalty:0}); 
    }
    else{
        res.json({status:'invalid', message:"User not found"});
    }
    res.json({status:'valid', updatedBills:pendingBills});
})
app.post('/authenticate', verifyTokenMiddleware, (req, res)=>{
    const token = req.headers.authorization?.split(' ')[1];
    if(req.body.role==='user'){
        if(tokens[req.body.username]===token) res.json({status:'success', payedBills:payedBills[req.body.username], pendingBills:pendingBills[req.body.username], profile:users[req.body.username]});
        else res.json({status:'failed'})
    }
    else if(req.body.role==='admin'){
        if( admin[token]===token) res.json({status:'success', payedBills:payedBills, pendingBills:pendingBills, users:users, dueBills:dueBills});
        else res.json({status:'failed'})
    }

})

app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
})