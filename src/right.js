import React from "react";
import "./right.css";
import image1 from "./images/image1.png";
import image2 from "./images/image2.png";
import image3 from "./images/image3.png";
import { ArrowLeftLine, ArrowRightLine, } from "@rsuite/icons";


export default function Right() {
    let [index, setIndex] = React.useState(0);
    let images = [image1, image2, image3];
    let headings = ["Meet the Control Hub", "Meet the Visual builder", "Meet the Exchange Hub"];

    let baseText = headings[index];
    function upImage() {
        index++;
        if (index > images.length - 1) {
            index = 0;
        }

        setIndex(index)
    }
    function downImage() {
        index--;
        if (index < 0) {
            index = images.length - 1;
        }
        baseText = headings[index];

        setIndex(index)
    }
    return (
        <div className="right">
            <div className="shadow" />

            <div className="shadow2" />
            <img src={image3} alt="Logo" className={index === 0 ? "selected" : "backImages"} />
            <img src={image2} alt="Logo" className={index === 1 ? "selected" : "backImages"} />
            <img src={image1} alt="Logo" className={index === 2 ? "selected" : "backImages"} />

            <div className="bottomText">
                <h2 className="heading">{baseText}</h2>
                <p className="para">Camel Cloud's visual integration builder lets you build integrations in real time in a beautiful, intuitive way.</p>
                <button className="leftButton" onClick={downImage}> <ArrowLeftLine /></button>
                <div className="navigation">
                    <div className={index === 0 ? "selectedDot" : "dot"}></div>
                    <div className={index === 1 ? "selectedDot" : "dot"}></div>
                    <div className={index === 2 ? "selectedDot" : "dot"}></div>
                </div> 
                <button className="rightButton" onClick={upImage} > <ArrowRightLine /></button>
            </div>
        </div >
    );
}