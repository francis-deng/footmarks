import {Component} from 'react';
import {useState,useRef,useEffect} from 'react';
import { useLocation,useNavigate } from "react-router-dom";
import conf from './conf';

import "./DiaryList.css";

function DiaryList() { 
    const navigate = useNavigate();
    const location = useLocation();

    const [diaryList, setDiaryList] = useState([]);
    const [reloadSwitch, setReloadSwitch] = useState(false);
    const images = useRef();

    const goNewItem = ()=>{
        navigate('/item',{state:{
            newItem:true,
        }});
    };

    const goExistedItem = (item_id)=>{
        navigate('/item',{
            state:{
            newItem:false,
            id:item_id,
            }
        });
    };   
    
    useEffect(()=>{
        const footmarksServerHttp = conf.FOOTMARKS_SERVER_HTTP;

        fetch(footmarksServerHttp + "/diary/list", {
            method: "GET",
            headers: {
                'Origin': 'http://localhost:30000'
            }
        })
        .then(res=>{
            if (res.ok){
                return res.json();
            }
        })
        .then((data) => {
            console.log("data:");
            console.log(data);
            setDiaryList(data);
        })
        .catch((err)=>{
          console.log("err: ",err)  
        });  
    }, [reloadSwitch]);

    const parseTs = (ts) => {
        const days = ['周日','周一','周二','周三','周四','周五','周六'];

        const dt = new Date(ts);
        let _date = dt.getDate();
        let _m = dt.getMonth();
        
        let _day = days[dt.getDay()];
        let hour = dt.getHours();
        let minute = dt.getMinutes();
        
        return {
            date: _date,
            monthday:`${_m}/${_day}`,
            hm:`${hour}:${minute}`
        };
    }

    const getMonthDay = ()=>{
        let now = new Date();
        let mon = now.getMonth();
        let date = now.getDate();

        return `${mon}月${date}日`;
    };

    const monthDay = getMonthDay();

    const getImagePathes = (d) => {
        let ret = [];

        if (d) {
            const keys = Object.keys(d);
            for (let key of keys) {
                console.log("key:" + key);
                if (key.startsWith("img")) {
                    if (d[key]) {
                        ret.push("http://localhost:30001/images/" + d[key]);
                    }
                    
                }
            }
        }

        return ret;
        
    }

    const getListContent = diaries => {
        console.log(diaries);
        let content = [];

        for (let index in diaries) {
          const e = diaries[index];
          let parsedTs = parseTs(e.ts);
          
          let sources = getImagePathes(e);
          console.log("sources:");
          console.log(sources);

          content.push(
            <div className="article">
            <span className="day">
                <div className="day-of-month">{parsedTs.date}</div>
                <div className="month-and-day-of-week">{parsedTs.monthday}</div>
            </span>
            <span className="content">
                <div className="text">
                {e.content}
                </div>
                <div className="images">
                    {sources.map((src)=><Img src={src}/>)}                   
                    
                </div>
                <div className="end-of-content">
                    <span>{parsedTs.hm}</span>
                    <span>{e.weather}</span>
                </div>
            </span>
        </div>
          );
        }
        return content;
      };


    return (
        <div>
            <div className="slide">
                aaaa
            </div>
            <div className="container">
                <div className="container-menu">
                    <div className="container-menu-button">菜单</div>
                    <div className="container-menu-date">{monthDay}</div>
                    <span className="container-menu-find">查找</span>
                    <span className="container-menu-miscellaneous">...</span>
                </div>

                {getListContent(diaryList)}

                <div className="article">
                    <span className="day">
                        <div className="day-of-month">19</div>
                        <div className="month-and-day-of-week">2月/周日</div>
                    </span>
                    <span className="content">
                        <div className="text">
                        欢迎使用一本日记，你的专属私密日记本。<p/>
            在一本日记中，你可以方便地图文记录每日日常。日记只有您本人能够查看...
                        </div>
                        <div className="images">
                            <img src="https://profile.csdnimg.cn/E/6/5/3_zjw0021" width="100" height="100"></img>
                            
                            
                        </div>
                        <div className="end-of-content">
                            <span>23:58</span>
                            <span>睛</span>
                        </div>
                    </span>
                </div>


                <div className="article">
                    <span className="day">
                        <div className="day-of-month">15</div>
                        <div className="month-and-day-of-week">2月/周三</div>
                    </span>
                    <span className="content">
                        <div className="text">
                        深圳<p/>
                        </div>
                        <div className="images">
                            <img src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/posture-royalty-free-image-986727300-1556067160.jpg?crop=1xw:1xh;center,top&resize=480:*" width="100" height="100"></img>
                            <img src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/posture-royalty-free-image-986727300-1556067160.jpg?crop=1xw:1xh;center,top&resize=480:*" width="100" height="100"></img>
                            
                        </div>
                        <div className="end-of-content">
                            <span>23:58</span>
                            <span>睛</span>
                        </div>
                    </span>
                </div>
            
                
            </div>
            
            <Pen onClick={goNewItem}></Pen>	
            
        </div>
    ); 
}

function Pen({onClick}) {
    return (
        <div>
            <div className="pen" onClick={onClick}>pen</div>
        </div>	        
    );
}

function Img(props) {
    return (
        <img src={props.src} width="100" height="100"></img>
    );
}
  
 export default DiaryList;