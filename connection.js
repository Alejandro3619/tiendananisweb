const {MongoClient}=require('mongodb')

const dbName='Api'
const url='mongodb://127.0.0.1:27017'


const client=new MongoClient(url,{
    useUnifiedTopology:true
})

module.exports=async()=>{
    await client.connect()

    return client.db(dbName)
}
    
