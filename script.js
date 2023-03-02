// TODO(you): Write the JavaScript necessary to complete the homework.

// You can access the RESULTS_MAP from "constants.js" in this file since
// "constants.js" has been included before "script.js" in index.html.


function getRes()
{
    //检索所有的
    reslist = {};
    for(let key in choose_con)
    {
        tem = choose_con[key].parentElement;
        cho = tem.dataset.choiceId;
        reslist[cho] = 0;
    }
    for(let key in choose_con)
    {
        tem = choose_con[key].parentElement;
        cho = tem.dataset.choiceId;
        reslist[cho] += 1;
        if(reslist[cho]>1)
        {
            return cho;
        }
    }

    return choose_con['one'].parentElement.dataset.choiceId;

}


function returnRes(res)
{
    title = RESULTS_MAP[res].title;
    content = RESULTS_MAP[res].contents;
    head = document.querySelector("#final_head");
    con = document.querySelector("#final_con");
    head.innerText = "You got " + title;
    con.innerText = content;
    final = document.querySelector("#final");
    final.classList.remove("hidden");
}


function check_end()
{
    if(choose_num === 3)
    {
        //先让所有的点不能点击
        removeClick();
        
        //找到最后的结果
        res = getRes();

        //依据结果返回最终的信息
        returnRes(res);


    }
}

//弄错了 这是个单选题

function click_item()
{
    item = event.currentTarget;
    pic = item;
    // 将这个元素的图片换成选中的图片
    pic.src = "images/checked.png";

    item = item.parentElement;

    //确定这是第几个问题
    ques_num = item.dataset.questionId;
    // 然后选择其所有子节点.
    child = document.querySelectorAll("[data-question-id='"+ques_num+"'].unselected");
    // 改变起这个选项内的所有其它选项的背景颜色
    if(child.length == 0)
    {
        child = document.querySelectorAll("[data-question-id='"+ques_num+"']");
        for(let elem of child)
        {
            elem.classList.add("unselected");
            elem.dataset.is_checked = "no";
        }   
    }



    if(item.dataset.is_checked == "no")
    {//没有被选中
        // 要把上次选中的取消掉 并且要记录选了几个
        if(choose_con[ques_num] === "")
        {//第一次选中
            ++choose_num;
            choose_con[ques_num] = pic;
            item.classList.remove('unselected');
            item.classList.add('selected');
            item.dataset.is_checked = 'yes';
        }else
        {
            let pic_ch = choose_con[ques_num];
            let item_ch = pic_ch.parentElement;
            pic_ch.src = "images/unchecked.png";
            item_ch.classList.remove('selected');
            item_ch.classList.add('unselected');
            item_ch.dataset.is_checked = 'no';

            item.classList.remove('unselected');
            item.classList.add('selected');
            choose_con[ques_num] = pic;
            item.dataset.is_checked = 'yes';

        }
        
        
    }else
    {//选中过的取消
        // pic.src = "images/unchecked.png";
        // item.classList.remove('selected');
        // item.classList.add('unselected');
        // item.dataset.is_checked = 'no';
    }
    
    // 检查结束
   check_end();
    // 然后要让下次选不到

}






// 给每个小框子加上点击事件
function canClick()
{
    choice = document.querySelectorAll(".checkbox");
    for(let elem of choice){
        elem.addEventListener('click',click_item);
    }
}

//选择结束不再点击
function removeClick()
{
    choice = document.querySelectorAll(".checkbox");
    for(let elem of choice){
        elem.removeEventListener('click',click_item);
    }
}


let choose_num = 0;
let choose_con = {};
choose_con['one'] = "";
choose_con['two'] = "";
choose_con['three'] = "";

canClick();