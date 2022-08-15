import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./Header.css";
import Table from '../Table/Table'
import { loadWeb3 } from "../../api";
import {contract_abi,contract_address} from '../../Utils/contract'

function Header() {
  var [table,set_table]= new useState({
    cols:[
            {Header:'Index',accessor:'index'},
            {Header:'Hash',accessor:'hash'}],
    rows:[
            {index:0,hash:''},
    ]});

  const [hash,sethash] = useState('');
  const [hashindex,sethashindex] = useState('');
  const [hashindexresult,sethashindexresult] = useState('');
  const submit_hash = async ()=>{
    let acc = await loadWeb3();
    if(acc == 'No Wallet')
    {
      alert('No Wallet')
    }
    else if(acc == 'Wrong Network')
    {
      alert('Wrong Network')
    }
    else{
      const store_contract = await new window.web3.eth.Contract(contract_abi,contract_address);
      const owner = await store_contract.methods.owner().call();
      if(owner == acc)
      {
        const returned_value = await store_contract.methods.store_hash(hash).send({from:acc});

      }
      else{
        alert("You are Not Allowed");
      }
    }
  }
  const submit_hashindex = async ()=>{
    let acc = await loadWeb3();
    if(acc == 'No Wallet')
    {
      alert('No Wallet')
    }
    else if(acc == 'Wrong Network')
    {
      alert('Wrong Network')
    }
    else{
      const store_contract = await new window.web3.eth.Contract(contract_abi,contract_address);
      try{
        const hashindex_data = await store_contract.methods.view_hash(hashindex).call();
        sethashindexresult(hashindex_data);
      }catch(e)
      {
        alert("Index Out of Bound");
      }
    }
  }
  const fullData = async ()=>{
    let table_div = document.querySelector('.table_div');
    let acc = await loadWeb3();
    if(acc == 'No Wallet')
    {
      alert('No Wallet')
    }
    else if(acc == 'Wrong Network')
    {
      alert('Wrong Network')
    }
    else{
      const store_contract = await new window.web3.eth.Contract(contract_abi,contract_address);
      try{
        const full_data = await store_contract.methods.view_fullarray().call();
        let obj = [] ;
        for(let x=0;x<full_data.length;x++)
        {
          obj.push({index:x,hash:full_data[x]})
        }
        console.log(obj)
        let table = {
          cols:[
            {Header:'Index',accessor:'index'},
            {Header:'Hash',accessor:'hash'}],
          rows:obj,
        }
        set_table(table);
        table_div.classList.remove('d-none');
        table_div.classList.add('d-block');

      }catch(e)
      {
        alert("Index Out of Bound");
      }
    }
  }

  const connect = async ()=>{
    let acc = await loadWeb3();
    if(acc == 'No Wallet')
    {
      alert('No Wallet')
    }
    else if(acc == 'Wrong Network')
    {
      alert('Wrong Network')
    }
    else{
      console.log('Connected');
    }
  }
  useEffect(()=>{
    connect();
  },[])
  return (
    <div className="Main_bg">
      <div className="fl">
        <div className="card card_w">
          <div className="cad-body">
            <h5 className="h1">Submit Your Hash</h5>
            <input
              type="text"
              className="input_"
              placeholder="Enter Hash"
              onChange={(e)=>{
                sethash(e.target.value)
              }}
            />
            <br />
            <br />
            <button className="btn btn_f " onClick={submit_hash}>Submit</button>
            <br />
          </div>
        </div>
      </div>
      <div className="fl">
        <div className="card card_w">
          <div className="cad-body">
            <h5 className="h1">Check Hash By Index</h5>
            <input
              type="text"
              className="input_"
              placeholder="Enter Index "
              onChange={(e)=>{
                sethashindex(e.target.value)
              }}
            />
            <br />
            <br />
            <button className="btn btn_f " onClick={submit_hashindex}>Submit</button>
            <br />
            <input
              type="text"
              className="input_"
              placeholder="Result"
              value={hashindexresult}
            />
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <br />
            <button className="btn btn_f "  onClick={fullData}>Show Data</button>
                <div className="d-none table_div">
                  <Table
                      data={table.rows}
                      columns={table.cols}
                  />
                </div>
          </div>

        </div>
      </div>

    </div>
  );
}

export default Header;
