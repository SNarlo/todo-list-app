
/**
 * A module for mobile functionality
 */
const mobileFunctionality = (() => {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const listsSection = document.querySelector('.lists-section');
    const tl = new TimelineLite({paused: true, reversed: true});


    tl.to(listsSection, 0.5, {
        width: '60%',
        ease: Power2.easeIn,
        display: 'flex'
    })
    .to(hamburgerMenu, 0.1, {
        transform: 'rotate(-90deg)',
        ease: Power2.easeIn
    })
    .to ('.lists', 0, {
        display: 'flex',
        ease: Power2.easeIn,
    })
    .to('.list-top-section', 0, {
        display: 'flex',
        ease: Power2.easeIn,
    })
    
    

    const listMenuLogicMobile = () => {
        hamburgerMenu.addEventListener('click', () => {
            
            if (hamburgerMenu.id == 'active-burger') { 
                toggleTween(tl);
                hamburgerMenu.id = 'inactive-burger';        
            }

            else if (hamburgerMenu.id == 'inactive-burger') {
                toggleTween(tl);
                hamburgerMenu.id = 'active-burger';
            }            
        });
    }

    const toggleTween = (tween) => {
        tween.reversed() ? tween.play() : tween.reverse();
    } 


    return {
        listMenuLogicMobile,
    }

})();


export default mobileFunctionality;