import React, {useState} from 'react';
import './SmallerFooter.css'

const SmallerFooter = () => {
    const [isOpen, setIsOpen] = useState(false)
    const clickToChange = (menuID) => {
        setIsOpen((prevState) => ({...prevState, [menuID]: !prevState[menuID],}));
    };
    return <>
        <div className="smallerFooterContainer">
            <div className="smallerFooterList">

                <div className='smallerFooterClickBtn'>
                    <li><a className='smallerFooterListTitle' href="">MY ACCOUNT</a></li>
                    <button onClick={() => clickToChange(1)}>{
                        isOpen[1] ? <ion-icon name="chevron-up-outline"></ion-icon>
                            : <ion-icon name="chevron-down-outline"></ion-icon>}
                    </button>
                </div>
                {isOpen[1] &&
                    <div className='clickBtn-content'>
                        <li><a className='listItems' href="">Membership Program</a></li>
                        <li><a className='listItems' href="">Sign In</a></li>
                        <li><a className='listItems' href="">Register</a></li>
                        <li><a className='listItems' href="">Order Status</a></li>
                        <li><a className='listItems' href="">Returns</a></li>
                    </div>}
            </div>
            <div className="smallerFooterList">

                <div className='smallerFooterClickBtn'>
                    <li><a className='smallerFooterListTitle' href="">HELP</a></li>
                    <button onClick={() => clickToChange(2)}>{
                        isOpen[2] ? <ion-icon name="chevron-up-outline"></ion-icon>
                            : <ion-icon name="chevron-down-outline"></ion-icon>}
                    </button>
                </div>
                {isOpen[2] &&
                    <div className='clickBtn-content'>
                        <li><a className='listItems' href="">FAQ</a></li>
                        <li><a className='listItems' href="">Accessibility Statement</a></li>
                        <li><a className='listItems' href="">Services</a></li>
                        <li><a className='listItems' href="">Ordering</a></li>
                        <li><a className='listItems' href="">Shipping Policy</a></li>
                        <li><a className='listItems' href="">Returns</a></li>
                        <li><a className='listItems' href="">Redeem Gift Cards</a></li>
                        <li><a className='listItems' href="">Sizing</a></li>
                        <li><a className='listItems' href="">Our Products</a></li>
                    </div>}
            </div>
            <div className="smallerFooterList">

                <div className='smallerFooterClickBtn'>
                    <li><a className='smallerFooterListTitle' href="">About US</a></li>
                    <button onClick={() => clickToChange(3)}>
                        {isOpen[3] ? <ion-icon name="chevron-up-outline"></ion-icon>
                            : <ion-icon name="chevron-down-outline"></ion-icon>}
                    </button>
                </div>
                {isOpen[3] && <div className='clickBtn-content'>
                    <li><a className='listItems' href="">Our Business</a></li>
                    <li><a className='listItems' href="">Media</a></li>
                    <li><a className='listItems' href="">Investors</a></li>
                    <li><a className='listItems' href="">Strategic Sales</a></li>
                    <li><a className='listItems' href="">Affiliates and Creators</a></li>
                    <li><a className='listItems' href="">Sweat Collective</a></li>
                    <li><a className='listItems' href="">Team Canada</a></li>
                </div>}
            </div>
            <div className="smallerFooterList">
                <div className='smallerFooterClickBtn'>
                    <li><a className='smallerFooterListTitle' href="">CONTACT US</a></li>
                    <button onClick={() => clickToChange(4)}>
                        {isOpen[4] ? <ion-icon name="chevron-up-outline"></ion-icon>
                            : <ion-icon name="chevron-down-outline"></ion-icon>}
                    </button>
                </div>
                {isOpen[4] && <div className='clickBtn-content'>
                    <li><a className='listItems' href="">Live Chat</a></li>
                    <li><a className='listItems' href="">Email Sign Up</a></li>
                    <li><a className='listItems' href="">Contact Us</a></li>
                    <li><a className='listItems' href=""></a></li>
                </div>}
            </div>
            <div className="smallerFooterList2">
                <li><a className='listTitle' href="">CAREERS</a></li>
                <li><a className='listTitle' href="">LIKE NEW</a></li>
                <li><a className='listTitle' href="">SUSTAINABILITY</a></li>
                <li><a className='listTitle' href="">SOCIAL IMPACT</a></li>
                <li><a className='listTitle' href="">DIVERSITY AND INCLUSION</a></li>
                <li><a className='listTitle' href="">LULULEMON APPS</a></li>
                <li><a className='listTitle' href="">SITEMAP</a></li>
            </div>
            <div className="smallerFooterList2">
                <li><a className='listTitle' href="">GIFT CARDS</a></li>
                <li><a className='listTitle' href="">STORE LOCATOR</a></li>
                <li><a className='listItems' href="">Privacy Policy</a></li>
                <li><a className='listItems' href="">Your Privacy Choices</a></li>
                <li><a className='listItems' href="">California Privacy Rights</a></li>
                <li><a className='listItems' href="">California Transparency Act</a></li>
            </div>
            <div className="smallerFooterList2 icons">
                <ion-icon name="logo-twitter"></ion-icon>
                <ion-icon name="logo-pinterest"></ion-icon>
                <ion-icon name="logo-youtube"></ion-icon>
                <ion-icon name="logo-facebook"></ion-icon>
                <ion-icon name="logo-instagram"></ion-icon>
            </div>
            <div className="smallerFooterList2"></div>

        </div>
        <div className="smallerFooterContainer2">
            <div><p>© lululemon athletica 1818 Cornwall Ave, Vancouver BC V6J 1C7</p></div>

            <div style={{display:'flex', justifyContent:'center',paddingBottom:'5rem'}}><a href="">Privacy Policy</a>|
                <a href="">Terms of Use</a></div>
        </div>
    </>
}

export default SmallerFooter;