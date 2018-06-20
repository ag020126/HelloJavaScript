var topic = [
    "華晨宇-煙火裡的塵埃",
    "彭佳慧-大齡女子",
    "張碧晨-年輪",
    "蕭敬騰-會痛的石頭",
    "毛不易-消愁",
    "岑寧兒-追光者"
];

var startDate = new Date();

function setMonthAndDay(startMonth, startDay)
{
   startDate.setMonth(startMonth-1);
   startDate.setDate(startDay);
   startDate.setHours(0);
   startDate.setMinutes(0);
   startDate.setSeconds(0);
}

setMonthAndDay(5,6);