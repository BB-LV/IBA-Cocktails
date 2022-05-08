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

////////////////////////////////////////
////////////////////NEED TO CLEANUP/////
////////////////////////////////////////

function hideShowingCards(){
    drinkCards.forEach(card => {
        if(card.classList.contains('drinkCardIntro')){
            card.classList.toggle('drinkCardIntro')
        }else if(card.classList.contains('drinkCardSlideIn')){
                card.classList.toggle('drinkCardSlideIn')
        }
    })
}

function takeFloatOffArrays() {
    dA.forEach(array => {
        if(array.classList.contains('drinkArrayFloat')){
            array.classList.toggle('drinkArrayFloat');
        }
        if(array.classList.contains('drinkArrayFloatD')){
            array.classList.toggle('drinkArrayFloatD')
        }
    })
}

function removeCocktailLinkedClick() {
    drinkNames.forEach(name => {
        if(name.classList.contains('cocktailLinkClicked')){
            name.classList.toggle('cocktailLinkClicked')
        }
    })
}

big3.forEach(indHeader => {
    indHeader.addEventListener('click', listerName => {
        let drinkArrays = document.querySelectorAll('.drinkArray');
        let headingCont = document.querySelector('.headingContainer');
            if(headingCont.classList.contains('headingContainerMovedF')){
                if(indHeader.classList.contains('clickedBig3')){
                    // same header clicked, reset (but the header is moved)
                    headingCont.classList.toggle('headingContainerMovedF') /* removing */
                    headingCont.classList.toggle('headingContainerMovedInitial') /* adding */
                    indHeader.classList.toggle('clickedBig3')
                    big3.forEach(indHeader4 => {
                        indHeader4.classList.toggle('big3ContHover')
                        indHeader4.children[1].classList.toggle('big3Hovered')
                    })
                    drinkArrays.forEach(drinkArr => {
                        if(drinkArr.classList.contains('drinkArrayInitial')){ // <-- should be an outtro
                            drinkArr.classList.toggle('drinkArrayInitial')
                        }
                    })
                }else{
                     // different header clicked (but the header is moved)
                    big3.forEach(indHeader3 => {
                        if(indHeader3 == indHeader){
                            indHeader3.classList.toggle('clickedBig3')
                        }else if(indHeader3.classList.contains('clickedBig3')){
                            indHeader3.classList.toggle('clickedBig3')
                        }
                    })
                    drinkArrays.forEach(drinkArr2 => {
                        if(drinkArr2.classList.contains('drinkArrayInitial')){  // <-- should be an outtro
                            drinkArr2.classList.toggle('drinkArrayInitial')
                        }else if(drinkArr2.dataset.category == indHeader.dataset.category){
                            drinkArr2.classList.toggle('drinkArrayInitial')
                        }
                    })
                }
                hideShowingCards();
                takeFloatOffArrays();
                removeCocktailLinkedClick();
            }else{ // <-- Heading Container not moved, initial move to stage 2.
                if(headingCont.classList.contains('headingContainerMovedInitial')){
                    headingCont.classList.toggle('headingContainerMovedInitial')
                }
                headingCont.classList.toggle('headingContainerMovedF')
                big3.forEach(indHeader2 => {
                    if(indHeader2 == indHeader){
                        indHeader.classList.toggle('clickedBig3')
                    }
                    if(indHeader2.classList.contains('big3ContHover')){
                        indHeader2.classList.toggle('big3ContHover')
                        indHeader2.children[1].classList.toggle('big3Hovered')
                    }
                })
                if(indHeader.classList.contains('unforgetHCont')){
                    document.querySelector('.unforgetHDrinks').classList.toggle('drinkArrayInitial');
                }else if(indHeader.classList.contains('contempCHCont')){
                    document.querySelector('.contempCHDrinks').classList.toggle('drinkArrayInitial');
                }else{
                    document.querySelector('.newEDHDrinks').classList.toggle('drinkArrayInitial');
                }
            }
    })
})

////////////////////
////////////////////
//////////////////// 

//Page State 2 (Control if and how cocktail cards are presented on the screen.)

////////////////////
////////////////////
////////////////////


drinkNames.forEach(dName => {
    dName.addEventListener('click', nameListener => {
        drinkCards.forEach(dCard => {
            function cardExit(){   // <-- Removes Card's Intro Animation Classes and gives an exit class.
                if(dCard.classList.contains('drinkCardSlideIn')){
                    dCard.classList.toggle('drinkCardSlideIn')
                    dCard.classList.toggle('drinkCardSlideOut')
                }else if(dCard.classList.contains('drinkCardIntro')){
                    dCard.classList.toggle('drinkCardIntro')
                    dCard.classList.toggle('drinkCardSlideOut')
                }
            }
            /*
            
            */


            if(dCard.dataset.dname == dName.dataset.dname){
                dA.forEach(drinkArray1 => {
                    if(drinkArray1.classList.contains('drinkArrayInitial')){
                        if(!drinkArray1.classList.contains('drinkArrayFloat')){
                            // its assumed this is initial stage 2
                            if(dCard.classList.contains('drinkCardSlideOut')){
                                dCard.classList.toggle('drinkCardSlideOut');
                            }
                            if(drinkArray1.classList.contains('drinkArrayDown')){
                                drinkArray1.classList.toggle('drinkArrayDown');
                            }
                            drinkArray1.classList.toggle('drinkArrayFloat');
                            dName.classList.toggle('cocktailLinkClicked');
                            dCard.classList.toggle('drinkCardIntro');
                        }else{
                            if(dName.classList.contains('cocktailLinkClicked')){
                                cardExit();
                                drinkArray1.classList.toggle('drinkArrayFloat');
                                drinkArray1.classList.toggle('drinkArrayDown');
                            }else{
                                cardExit();
                                dCard.classList.toggle('drinkCardSlideIn');
                                drinkNames.forEach(name2 => {
                                    if(name2.classList.contains('cocktailLinkClicked')){
                                        name2.classList.toggle('cocktailLinkClicked');
                                    }
                                })
                            }
                            dName.classList.toggle('cocktailLinkClicked');
                        }

                    }
                })
            }else{
                // Every card that is not tied to the drink name being clicked
                cardExit();
            }
        })
    })
})

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
            if(indDCard2.classList.contains('drinkCardIntro')){
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
//Mutation Observers 
////////////////////

// For Method Containers (Hides Method Containers Every Time A Card Changes)

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