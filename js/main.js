/*

    Page is Separated by three 'states'. State 1 is the initial state
    where you must pick your grouping. State 2 is where you must pick 
    a cocktail. State 3 is a cocktail 'card' showing for your selection.
    If any previous state is selected the page will revert to the previous
    state.

*/

// HTML Element Attachments

const big3 = document.querySelectorAll('.big3Cont');
const drinkNames = document.querySelectorAll('.cocktailLink');
const drinkCards = document.querySelectorAll('.drinkCardCont');
const dA = document.querySelectorAll('.drinkArray'); // const dA = document.querySelector('.drinkArray');
const revealButtons = document.querySelectorAll('.revealButton');
const convertButtons = document.querySelectorAll('.onoffswitch')
const measures = document.querySelectorAll('.measure')

////////////////////
////////////////////
//////////////////// 

//Page State 1 (Pick Main Group of Cocktails)

////////////////////
////////////////////
////////////////////

big3.forEach(i => {
    i.addEventListener('click', e => {
        let x = document.querySelector('.headingContainer');
        let drinkArrays = document.querySelectorAll('.drinkArray');
        let r = document.querySelectorAll('.drinkCardCont')
        if(i.classList.contains('clickedbig3')){    // <--- resets to state 1 if button clicked is already selected *****
            x.classList.toggle('headingContainerMoved');
            x.classList.toggle('headingContainerHover');
            big3.forEach(y => {
                y.classList.toggle('big3ContHover');
                i.classList.toggle('big3ContMoved');
            });
            i.classList.toggle('clickedbig3');
            drinkArrays.forEach(f => f.style.display = 'none');
            drinkArrays.forEach(da => {      // <----- resets the .drinkArray's position to default
                if(da.classList.contains('drinkArrayMoved')){
                    da.classList.toggle('drinkArrayMoved')
                }
            })
            r.forEach(rr => {   // <---- toggles drink cards if they are showing
                if(!rr.classList.contains('drinkCardContNone')){
                    rr.classList.toggle('drinkCardContNone')
                }
            })
        }else if(x.classList.contains('headingContainerMoved')){ // rearranges state 2  *****
            big3.forEach(a => {
                a.classList.remove('clickedbig3');
            });
            i.classList.toggle('clickedbig3')
            drinkArrays.forEach(g => g.style.display = 'none');
            if(i.classList.contains('unforgetHCont')){
                drinkArrays[0].style.display = 'flex';
            }else if(i.classList.contains('contempCHCont')){
                drinkArrays[1].style.display = 'flex';
            }else{
                drinkArrays[2].style.display ='flex';
            };
            drinkArrays.forEach(da => {      // <----- resets the .drinkArray's position to default
                if(da.classList.contains('drinkArrayMoved')){
                    da.classList.toggle('drinkArrayMoved')
                }
            })
            r.forEach(rr => {   // <---- toggles drink cards if they are showing
                if(!rr.classList.contains('drinkCardContNone')){
                    rr.classList.toggle('drinkCardContNone')
                }
            })
        }else{      // state 1 is assumed here. transitions state 1 to state 2.*****
            x.classList.toggle('headingContainerMoved');
            x.classList.toggle('headingContainerHover');
            big3.forEach(y => {
                y.classList.toggle('big3ContHover');
                i.classList.toggle('big3ContMoved');
            });
            i.classList.toggle('clickedbig3');
            x.classList.toggle('headingContainerClickedPerspective');
            if(i.classList.contains('unforgetHCont')){
                drinkArrays[0].style.display = 'flex';
            }else if(i.classList.contains('contempCHCont')){
                drinkArrays[1].style.display = 'flex';
            }else{
                drinkArrays[2].style.display ='flex';
            };
        };
    }
)});

////////////////////
////////////////////
//////////////////// 

//Page State 2 (Control if and how cocktail cards are presented on the screen.)

////////////////////
////////////////////
////////////////////

drinkNames.forEach(indDrink => {
    indDrink.addEventListener('click', clicked => {
        drinkCards.forEach(indDCard => {
            if(indDCard.dataset.dname == indDrink.dataset.dname){
                if(dA[0].classList.contains('drinkArrayMoved')){
                    if(!indDCard.classList.contains('drinkCardContNone')){  
                        dA.forEach(drinkArr => {
                            drinkArr.classList.toggle('drinkArrayMoved')
                        });
                        indDCard.classList.toggle('drinkCardContNone');
                    }else{                                                
                        indDCard.classList.toggle('drinkCardContNone');
                    };
                }else{
                    dA.forEach(drinkArr2 => {
                        if(!drinkArr2.classList.contains('drinkArrayMoved')){
                            drinkArr2.classList.toggle('drinkArrayMoved')
                        }
                    })
                    indDCard.classList.toggle('drinkCardContNone');
                };
            }else{
                if(!indDCard.classList.contains('drinkCardContNone')){
                    indDCard.classList.toggle('drinkCardContNone');
                };
            };
        })

    })
});

////////////////////
////////////////////
//////////////////// 

//Reveal Method On Drink Container

////////////////////
////////////////////
////////////////////

revealButtons.forEach(indButton => {
    indButton.addEventListener('click', buttonClicked => {
        drinkCards.forEach(indDCard2 => {
            if(!indDCard2.classList.contains('drinkCardContNone')){
                for(let count = 0; count <indDCard2.children.length; count++){
                    if(indDCard2.children[count].classList.contains('methodCont')){
                        indDCard2.children[count].classList.toggle('methodContNone');
                    }
                }
            }
        })
    })
});

////////////////////
//Mutation Observer For Method Containers (Hides Method Containers Every Time A Card Changes)
////////////////////

const observer = new MutationObserver(function() {
    let methodContainers = document.querySelectorAll('.methodCont')
    methodContainers.forEach(indMCont => {
        if(!indMCont.classList.contains('methodContNone')){
            indMCont.classList.toggle('methodContNone')
        }
    })
})

drinkCards.forEach(drinkC => {
    observer.observe(drinkC, {
        attributes: true,
    })
})



////////////////////
////////////////////
//////////////////// 

//Convert mL to Oz (Displayed On Card)

////////////////////
////////////////////
////////////////////

convertButtons.forEach(convBut => {
    convBut.addEventListener('click', convertClicked => {
        measures.forEach(indMeasure => {
            let stringHolder = indMeasure.children[0].textContent
            stringHolder = stringHolder.split(' ')
                if(stringHolder[0].includes('mL')){
                    stringHolder[0] = stringHolder[0].split('mL')
                    stringHolder[0][0] = (Math.round((stringHolder[0][0] * 0.033814).toFixed(2) * 4) / 4) + 'oz'
                    indMeasure.children[0].textContent = stringHolder.flat(2).join(' ')
                }else if(stringHolder[0].includes('oz')){
                    stringHolder[0] = indMeasure.dataset.meas
                    indMeasure.children[0].textContent = stringHolder.join(' ')
                }
            })
        document.querySelectorAll('.onoffswitch-checkbox').forEach(checkbox => {
            checkbox.toggleAttribute('checked');
        })
    })
})  