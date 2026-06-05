import {db} from "./firebaseConnection"
import { useState, useEffect } from "react";
import { getDocs,doc,updateDoc, collection } from "firebase/firestore";
import "./app.css"

function App(){
  const [pedidoInfo, setPedidoInfo] = useState([]);
  const [busca,setBusca] = useState("")

  const filtroPedidos = pedidoInfo.filter((item)=>  {
   const textoBusca = busca.toLowerCase();

   return(
    item.nome.toLowerCase().includes(textoBusca) ||
    item.cpf.toLowerCase().includes(textoBusca) ||
    item.telefone.toLowerCase().includes(textoBusca) ||
    item.email.toLowerCase().includes(textoBusca) ||
    item.bairro.toLowerCase().includes(textoBusca) ||
    item.status.toLowerCase().includes(textoBusca) ||
    item.dataNascimento.toLowerCase().includes(textoBusca) ||
    item.dataPedido.toLowerCase().includes(textoBusca) ||
    item.ruaNumero.toLowerCase().includes(textoBusca)
   );
  });

  useEffect(()=>{

    async function henderDoc(){
    try{
      
       
      const refPedidos = collection(db,"informacao-do-pedido");
      const snapshot = await getDocs(refPedidos);
      
        let lista = []

        snapshot.forEach((docItem) => {
          lista.push({
            id: docItem.id,
            nome: docItem.data().nome,
            cpf: docItem.data().cpf,
            email: docItem.data().email,
            telefone: docItem.data().telefone,
            dataNascimento: docItem.data().dataNascimento,
            bairro: docItem.data().bairro,
            ruaNumero: docItem.data().ruaNumero,
            dataPedido: docItem.data().dataPedido,
            status: docItem.data().status
          });
        });
        setPedidoInfo(lista)
      }catch{
        console.log("deu erro seu bot")
      }
    }   

henderDoc()

  },[])

  async function hendlerStatus(id, novoStatus){

    try{

      const pedidoRef = doc(db, "informacao-do-pedido",id);

      await updateDoc(pedidoRef,{
        status: novoStatus
      });

      const listaAtualizada = pedidoInfo.map((item)=>{
        if (item.id === id){
          return{...item, status: novoStatus}
        }
        return item;
      });

      setPedidoInfo(listaAtualizada);

    }catch{
      console.log(
        "algo deu errado"
      )

    }

  }

  return (
    <div className="container">
      <div className="titulo">
        <h1>Tabela de pedidos</h1>
      </div>
      <div className="menu">
        <input className="input" type="text"
        placeholder="Buscar pedido"
        value={busca}
        onChange={(e)=> setBusca(e.target.value)}/>
        <div className="lupa"></div>
      </div>
        
       
      <table border="1">
        
        <thead>
        <tr>
        <th>Ordem</th>
        <th>Nome</th>
        <th>CPF</th>
        <th>Data de Nascimento</th>
        <th>Telefone</th>
        <th>E-mail</th>
        <th>Bairro</th>
        <th>Endereço</th>
        <th>Data do pedido</th>
        <th>Status</th>
        </tr>
        </thead>

        <tbody>
          {filtroPedidos.map((info, index)=>{
            return(
              <tr key={info.id}>
                <td>{index + 1}</td>
                <td>{info.nome}</td>
                <td>{info.cpf}</td>
                <td>{info.dataNascimento}</td>
                <td>{info.telefone}</td>
                <td>{info.email}</td>
                <td>{info.bairro}</td>
                <td>{info.ruaNumero}</td>
                <td>{info.dataPedido}</td>
                <td><select
                 value={info.status}
                 onChange={(e)=> hendlerStatus(info.id, e.target.value)}>
                  
                  <option value="em_analise">em análize</option>
                  <option value="em_preparo">em preparo</option>
                  <option value="a_caminho">a caminho</option>
                  <option value="entregue">entregue</option>
                  </select ></td>
              </tr>
            )
        })} 
        </tbody>
        
        
      </table>
    </div>
    
    
  );
}

export default App;
