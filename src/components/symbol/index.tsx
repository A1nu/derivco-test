import React, {ReactNode} from 'react';
import {SymbolType} from "../../shared/SymbolType";
import bar2x from '../../images/2xBAR.png';
import bar3x from '../../images/3xBAR.png';
import seven from '../../images/7.png';
import bar from '../../images/BAR.png';
import cherry from '../../images/Cherry.png';
import {Col} from "react-bootstrap";
import './index.css';
import {animationTime} from "../../shared/config";

type SymbolProps = {
    symbolType: SymbolType,
    pushing?: boolean,
    height?: number
}

export const Symbol = ({symbolType, pushing, height}: SymbolProps) => {
    let image: ReactNode;

    switch (symbolType) {
        case SymbolType.Bar2X:
            image = <img height={height} alt='2xBar' src={bar2x} />
            break
        case SymbolType.Bar3X:
            image = <img height={height} alt='3xBar' src={bar3x} />
            break
        case SymbolType.Bar:
            image = <img height={height} alt='bar' src={bar} />
            break
        case SymbolType.Cherry:
            image = <img height={height} alt='cherry' src={cherry} />
            break
        case SymbolType.Seven:
            image = <img height={height} alt='seven' src={seven} />
            break
        default:
            return null;
    }

    return <Col sm={12} className={`mt-2 row justify-content-center`} style={pushing ? {animation: `appearing ${animationTime}s`} : {}}>{image}</Col>
}