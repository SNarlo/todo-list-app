
/**
 * A module for mobile functionality
 */
const mobileFunctionality = (() => {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const listsSection = document.querySelector('.lists-section');
    
    const listMenuLogicMobile = () => {
        hamburgerMenu.addEventListener('click', () => {
            
            
            if (hamburgerMenu.id == 'active-burger') { 
                hamburgerMenu.style.transform = 'rotate(180deg)';
                listsSection.style.display = 'none';
                hamburgerMenu.id = 'inactive-burger';        
            }

            else if (hamburgerMenu.id == 'inactive-burger') {
                hamburgerMenu.style.transform = 'rotate(-90deg)';
                listsSection.style.display = 'flex';
                hamburgerMenu.id = 'active-burger';
            }

            
        });

    }


    return {
        listMenuLogicMobile,
    }

})();

export default mobileFunctionality;