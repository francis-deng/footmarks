
import {useState,useRef,useEffect} from 'react';
import { useLocation,useNavigate } from "react-router-dom";

import Gallery from "./Gallery";
import "./DiaryItem.css";

function DiaryItem() {
    const navigate = useNavigate();
    const location = useLocation();
    //console.log("newItem:" + location.state.newItem);

    const inputValuesRef = useRef({});

    const inputValues = (evt)=>{
        inputValuesRef.current[evt.target.id]=evt.target.textContent;
    };

    const changeImages = (imgs)=>{
        inputValuesRef.current["images"] = imgs;
    }

    const save = ()=>{
        let inputValues = inputValuesRef.current;

        if (location.state.newItem) {// insert one
            

            let data = new FormData();
            Object.keys(inputValues).forEach((k)=>{
                if (k!="images") {
                    //console.log(k,inputValues[k]);
                    data.append(k, inputValues[k]);
                }
            });

            if (inputValues["images"]) {
                let files = inputValues["images"];

                for (var index=0;index<files.length;index++){
                    console.log("img"+index," ",files[index].name);
                    data.append("img"+index,files[index],files[index].name);
                }   
            }

            data.append('ts', new Date().getTime());
            console.log("FormData:\n");
            console.log(data);

            fetch("http://localhost:30001/diary/new", {
                method: "POST",
                body: data,
            })
            .then((data) => console.log(data))
            .catch((err)=>{
              console.log("err: ",err)  
            });  
            
            navigate('/',{state:{
                refresh:true,
            }});            
         
        } else { // update existed one

        }
    }

    return (
        <div className="container">
            <div className="toolbar">
                <span>
                    <span className="close" onClick={save}>X</span>
                    <span className="local-time">2月20日 / 11:41 周一 今天</span>			
                </span>
                <span>
                    <span className="miscellaneous">...</span>
                </span>
    
            </div>		
            
            <p id="content" onInput={inputValues} className="content font-setting" contenteditable="true">
            记录今日
            </p>
    
            <Gallery changeImages={changeImages}/>
            
            <div id="weather" onInput={inputValues} className="weather font-setting" contenteditable="true">
            选择天气
            </div>
    
            <div id="location" onInput={inputValues} className="location font-setting" contenteditable="true">
            选择位置
            </div>
    
            <div id="device" onInput={inputValues} className="device font-setting" contenteditable="true">
            选择设备
            </div>
    
            <div className="word-count font-setting">
            字数统计
            </div>		
        </div>
    );
}

export default DiaryItem;