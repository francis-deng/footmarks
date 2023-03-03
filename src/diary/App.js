import "./App.css"

function App() {
    return (
        <div>
            <div class="slide">
                aaaa
            </div>
            <div class="container">
                <div class="container-menu">
                    <div class="container-menu-button" onclick="clickSlide()">菜单</div>
                    <div class="container-menu-date">2月20日</div>
                    <span class="container-menu-find">查找</span>
                    <span class="container-menu-miscellaneous">...</span>
                </div>
                <div class="article">
                    <span class="day">
                        <div class="day-of-month">19</div>
                        <div class="month-and-day-of-week">2月/周日</div>
                    </span>
                    <span class="content">
                        <div class="text">
                        欢迎使用一本日记，你的专属私密日记本。<p/>
            在一本日记中，你可以方便地图文记录每日日常。日记只有您本人能够查看...
                        </div>
                        <div class="images">
                            <img src="https://profile.csdnimg.cn/E/6/5/3_zjw0021" width="100" height="100"></img>
                            
                            
                        </div>
                        <div class="end-of-content">
                            <span>23:58</span>
                            <span>睛</span>
                        </div>
                    </span>
                </div>


                <div class="article">
                    <span class="day">
                        <div class="day-of-month">15</div>
                        <div class="month-and-day-of-week">2月/周三</div>
                    </span>
                    <span class="content">
                        <div class="text">
                        深圳<p/>
                        </div>
                        <div class="images">
                            <img src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/posture-royalty-free-image-986727300-1556067160.jpg?crop=1xw:1xh;center,top&resize=480:*" width="100" height="100"></img>
                            <img src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/posture-royalty-free-image-986727300-1556067160.jpg?crop=1xw:1xh;center,top&resize=480:*" width="100" height="100"></img>
                            
                        </div>
                        <div class="end-of-content">
                            <span>23:58</span>
                            <span>睛</span>
                        </div>
                    </span>
                </div>
            
                
            </div>
            
            <div>
                <div class="pen">pen</div>
            </div>	
            
        </div>
    );
  }
  
  export default App;