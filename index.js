const express = require('express');

const { MongoClient, ObjectId } = require('mongodb');

const uri = "mongodb+srv://jaimejmatrix:pnzTLfXmz5WY4NJ6@cluster0.m2ln2mx.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true })

const app = express();
const port = 1000;


/*async function mongoDbConnect(){

    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
      } catch(e){
    
        console.log('Error al conectar a mongo',e)
      }
    
}

mongoDbConnect()
*/
app.get('/user', async (req, res) => {
    try {
        await client.connect();

        const db=client.db('Listadetareas');

        const collection=db.collection('user');

        const documentos= await collection.find().toArray();

        client.close();
        res.send(documentos)

    } catch (err) {
       res.status(500).send('algo salio mal')
    }
})

app.post('/user',async (req,res) =>{
  const body={
   
   "username":"ley",
   "name":" leydi laura",
   "lastname":"salinas",
   "email":"wendy@hotmail.com",
    "password":"432432@dsa"

  }
   try{
  await client.connect();
        const db=client.db('Listadetareas');

        const collection=db.collection('user');

     const newdoc=await collection.insertOne(body);

     if(newdoc){
        res.status(201).send(newdoc)
   

     }else{
        res.status(500).send('algo salio mal')
   

     }
    }catch(e){
        res.status(500).send('algo salio mal')
   
    }
})

app.put('/user/:id',async (req,res) =>{
const id=req.params.id
const body={
    "username":"ley",
   "name":"leidy wendy",
   "lastname":"reyes salinas",
   "email":"wendy@hotmail.com",
    "password":"432432@dsa"

   }

   try{
    await client.connect();
          const db=client.db('Listadetareas');
  
          const collection=db.collection('user');
  
       const updatedoc=await collection.updateOne({_id: new ObjectId(id)},{$set:body});
  
       if(updatedoc){
          res.status(201).send(updatedoc)
     
  
       }else{
          res.status(500).send('algo salio mal')
     
  
       }
      }catch(e){
          res.status(500).send('algo salio mal')
     
      }
   
})

app.delete('/user/:id',async(req,res) =>{
    const id=req.params.id

    try{
        await client.connect();
              const db=client.db('Listadetareas');
      
              const collection=db.collection('user');
              
              const remodoc=await collection.deleteOne({_id: new ObjectId(id)})
             
              if(remodoc.deletedCount>0){
                res.status(201).send('Usuario eliminado')
           
        
             }else{
                res.status(500).send('algo salio mal')
           
        
             }
            

            }catch(e){
                res.status(500).send('algo salio mal')
           
            }
  
})



//metosdos dela coleccion tareas
app.get('/tareas', async (req, res) => {
    try {
        await client.connect();

        const db=client.db('Listadetareas');

        const collection=db.collection('tareas');

        const documentos= await collection.find().toArray();

        client.close();
        res.send(documentos)

    } catch (err) {
       res.status(500).send('algo salio mal')
    }
})



app.post('/tareas',async (req,res) =>{
    const body={
    
     "nombretarea":"jugar futbol",
     "completado":"true",
     "fecha":"28/11/2021",
     "descripcion":"en el metropolitano"
     
    }
     try{
    await client.connect();
          const db=client.db('Listadetareas');
  
          const collection=db.collection('tareas');
  
       const newdoc=await collection.insertOne(body)
  
       if(newdoc){
          res.status(201).send(newdoc)
     
  
       }else{
          res.status(500).send('algo salio mal')
     
  
       }
      }catch(e){
          res.status(500).send('algo salio mal')
     
      }
  })
  

  app.put('/tareas/:id',async (req,res) =>{
    const id=req.params.id
    const body={
        "nombretarea":"jugar futbol",
        "completado":"true",
        "fecha":"21/11/2021",
        "descripcion":"en el movistararenas"
        
       }
    
       try{
        await client.connect();
              const db=client.db('Listadetareas');
      
              const collection=db.collection('tareas');
      
           const updatedoc=await collection.updateOne({_id: new ObjectId(id)},{$set:body});
      
           if(updatedoc){
              res.status(201).send(updatedoc)
         
      
           }else{
              res.status(500).send('algo salio mal')
         
      
           }
          }catch(e){
              res.status(500).send('algo salio mal')
         
          }
       
    })
    

    app.delete('/tareas/:id',async(req,res) =>{
        const id=req.params.id
    
        try{
            await client.connect();
                  const db=client.db('Listadetareas');
          
                  const collection=db.collection('tareas');
                  
                  const remodoc=await collection.deleteOne({_id: new ObjectId(id)})
                 
                  if(remodoc.deletedCount>0){
                    res.status(201).send('Usuario eliminado')
               
            
                 }else{
                    res.status(500).send('algo salio mal')
               
            
                 }
                
    
                }catch(e){
                    res.status(500).send('algo salio mal')
               
                }
      
    })
    
    


app.listen(port, () => {
    console.log('servidor coriendo')
})
