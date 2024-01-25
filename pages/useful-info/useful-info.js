let infoContent =document.querySelector('.useful-info__content');


const getAllInfo =(num)=>{
    fetch('https://incoavtodb.onrender.com/info')
        .then((response)=>response.json())
        .then((info)=>{
            info.filter((item,idx)=> idx > num * 5 - 6 && idx < num *5).forEach((item,idx)=>{
                infoContent.innerHTML += `
            <div style="flex-direction: ${idx % 2 === 0 ? 'row-reverse' : 'row'}" " class="useful-info__content-card">
            <div class="useful-info__content-imgs">
            <img class="useful-info__content-img" src="${item.image}" alt="">
            </div>
                   
                    <div class="useful-info__content-right">
                        <h3 class="useful-info__content-title">${item.title}</h3>
                           <p class="useful-info__content-subtitle">${item.descr}</p>
                        <button class="useful-info__content-btn car__content-btn" data-id ="${item.id}">Подробнее</button>
                    </div>
                </div>
            `
            });
            if (info.length > 5){
                let ul = document.createElement('ul');
                let arrow = document.createElement('span.arrow-prev');
                let arrow2 = document.createElement('span.arrow-next');
                arrow.textContent = 'first';
                arrow2.textContent = 'last';
                ul.classList.add('useful-info-list');
                for (let i= 1; i <= Math.ceil(info.length /5 );i++){
                    ul.innerHTML += `
                    <li style="cursor: pointer;display: ${i === num || i + 1 === num || i -1 === num ? 'flex':num === 1 && i ===3 ||num === Math.ceil(info.length /5 )&& i=== Math.ceil(info.length /5 )-2 ?'flex':'none'}" class="useful-info-item ${i=== num ?'active':''}" data-id="${i}">${i}</li>
                    `
                }
                if (num > 2){
                    ul.prepend(arrow);
                    arrow.addEventListener('click',async ()=>{
                        document.querySelector('.useful-info-list').innerHTML='';
                        infoContent.innerHTML = '';
                        await getAllInfo(1);
                        await scroll(0,0)
                    })
                }
                if (num <Math.ceil(info.length /5 )-1){
                    ul.append(arrow2);
                    arrow2.addEventListener('click',async ()=>{
                        document.querySelector('.useful-info-list').innerHTML='';
                        infoContent.innerHTML = '';
                        await getAllInfo(Math.ceil(info.length /5 ));
                        await scroll(0,0)
                    })
                }
                infoContent.after(ul)
            }
            let allLi =document.querySelectorAll('.useful-info-item');
            allLi.forEach((item)=>{
                item.addEventListener('click',async ()=>{
                    document.querySelector('.useful-info-list').innerHTML='';
                    infoContent.innerHTML = '';
                   await getAllInfo(+item.dataset.id);
                    await scroll(0,0)
                })
            });
        })
};
getAllInfo(1);






