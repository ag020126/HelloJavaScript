$(document).ready(function() {
  //建立currentQuiz, 儲存目前作答到第幾題
  var currentQuiz=null;
  //當按下按鈕後, 要做的事情放在這裡面 
  $("#startButton").click(function()
  {
      //如果還沒開始作答就從這裡開始
      if(currentQuiz==null)
      {
        //設定目前作答道第0題
        currentQuiz=0;
        //顯示題目  
        $("#question").text(questions[0].question);
        //每次顯示選項前先將該區域清空(可以試著先不做這一步)
        $("#options").empty();
        //將一個一個選項內容,添加至選項區塊
        for(var x=0;x<questions[0].answers.length;x++)
        {
            
            $("#options").append("<input name='options'type='radio' value="+x+">"+"<label>"+questions[0].answers[x][0]+"</label><br><br>");
        }
        //將按鈕紹的文字換成Next或下一題
        $("#startButton").attr("value","Next");
       }
       else //如果開始作答就從這裡繼續
       {
          //巡訪每個選項是否有被選取
          $.each($(":radio"),function(i,val){
              if(val.checked)
              {
               //使用者 所選取的項目是否已經產生最終結果(A~D)
                if(isNaN(questions[currentQuiz].answers[i][1]))
                 {
                     //通往最終結果
                      var finalReult = questions[currentQuiz].answers[i][1];
                     //顯示最終結果的標題
                     $("#question").text(finalAnswers[finalReult][0]);
                     //將選項區域清空
                     $("#options").empty();
                     //顯示最終結果的詳細內容
                     $("#options").append(finalAnswers[finalReult][1]+"<br><br>");
                     //將目前作答到第幾題的變數清空
                     currentQuiz=null;
                     //修改按鈕為重新開始
                     $("#startButton").attr("value","重新開始")
                     
                 }
                else
                 {  
                     currentQuiz=questions[currentQuiz].answers[i][1]-1;
                     $("#question").text(questions[currentQuiz].question);
                     $("#options").empty();
                     for(var x=0;x<questions[currentQuiz].answers.length;x++)
                     {
                         $("#options").append("<input name='option' type='radio'value="+x+" >"+"<label>"+questions[currentQuiz].answers[x][0]+"</lable><br><br>"); 
                     }
                 }
                 return false;
              }
        });
       }
   });
  });