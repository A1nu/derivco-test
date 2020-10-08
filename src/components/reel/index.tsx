import React, {Component, ReactNode} from 'react';
import {Symbol} from "../symbol";
import {Col, Row} from "react-bootstrap";
import {DefaultOrder, fullSpinTime} from "../../shared/config";
import {getRandomNumber} from "../../utils/randomizer";
import {SymbolType} from "../../shared/SymbolType";

type ReelState = {
    hidden: number
    top: number
    middle: number
    bottom: number
    bottomHidden: number
    elements: ReactNode[]
};

type ReelProps = {
    middleSymbol: number
    handler: any,
    reelNumber: number,
    debug: boolean,
    debugContext?: {
        row: number,
        value: SymbolType
    }
}

export class Reel extends Component<ReelProps, ReelState> {
    constructor(props: ReelProps) {
        super(props);
        this.state = {
            hidden: this.getElementNumber(props.middleSymbol, -2),
            top: this.getElementNumber(props.middleSymbol, -1),
            middle: props.middleSymbol,
            bottom: this.getElementNumber(props.middleSymbol, +1),
            bottomHidden: this.getElementNumber(props.middleSymbol, +2),
            elements: this.initElements(props.middleSymbol)
        }
    }

    getDebugValue():number {
        if (this.props.debugContext?.row === 1) {
            return this.props.debugContext?.value + 1
        }

        if (this.props.debugContext?.row === 3) {
            return this.props.debugContext?.value - 1
        }

        return this.props.debugContext?.value as number
    }

    spin() {
        let animationTime = 0;
        let timesUp = false;
        setTimeout(() => {
            timesUp = true
            if (!this.props.debug) {
                this.setState({
                    ...this.state,
                    middle: getRandomNumber(1, 5) + 1
                })
            } else {
                this.setState({
                    ...this.state,
                    middle: this.getDebugValue() + 1
                })
            }
        }, 1000 + this.props.reelNumber*200)

        const loop = () => {
            setTimeout(() => {
                const middleSymbol = this.getElementNumber(this.state.middle, -1);
                this.setState({
                    ...this.state,
                    elements: this.initElements(middleSymbol, true),
                    hidden: this.getElementNumber(middleSymbol, -2),
                    top: this.getElementNumber(middleSymbol, -1),
                    middle: middleSymbol,
                    bottom: this.getElementNumber(middleSymbol, +1),
                    bottomHidden: this.getElementNumber(middleSymbol, +2)
                });
                if (!timesUp) {
                    loop()
                } else {
                    this.props.handler(this.props.reelNumber, this.state.top, this.state.middle, this.state.bottom)
                }
            }, 1000 * animationTime)
        }
        loop()
    }

    getElementNumber(elementNumber: number, position: number): number {
        if (!(0 <= elementNumber + position && elementNumber + position < DefaultOrder.length)) {
            if (elementNumber + position < 0) {
                return (DefaultOrder.length) - Math.abs(position) + elementNumber
            }
            if (elementNumber + position > DefaultOrder.length - 1) {
                return position - (DefaultOrder.length - elementNumber)
            }
        }
        return elementNumber + position
    }

    private initElements(middle: number, spinning?: boolean): ReactNode[] {
        const elements: ReactNode[] = [];
        elements.push(<Symbol key={`symbol${this.props.reelNumber}0-${this.getElementNumber(middle, -2)}`} pushing={spinning} symbolType={this.getElementNumber(middle, -2)} />)
        elements.push(<Symbol key={`symbol${this.props.reelNumber}1-${this.getElementNumber(middle, -1)}`} symbolType={this.getElementNumber(middle, -1)} />)
        elements.push(<Symbol key={`symbol${this.props.reelNumber}2-${middle}`} symbolType={middle} />)
        elements.push(<Symbol key={`symbol${this.props.reelNumber}3-${this.getElementNumber(middle, +1)}`} symbolType={this.getElementNumber(middle, +1)} />)
        elements.push(<Symbol key={`symbol${this.props.reelNumber}4-${this.getElementNumber(middle, +2)}`} symbolType={this.getElementNumber(middle, +2)} />)
        return elements;
    }

    render(): ReactNode {
        return (
            <Col>
                <Row style={{position: 'relative', height: 400, overflow: 'hidden'}}>
                    <Col style={{position: 'absolute', top: -125}}>
                        {this.state.elements}
                    </Col>
                </Row>
            </Col>
        )
    }
}