import React, {Component, ReactNode} from 'react';
import {Button, Col, Row} from "react-bootstrap";
import {Reel} from "../reel";
import {getRandomNumber} from "../../utils/randomizer";
import {DefaultOrder, initialBalance} from "../../shared/config";
import {PayoutTable} from "../payout-table";
import {SymbolType} from "../../shared/SymbolType";

type MachineState = {
    reel1: number,
    reel2: number,
    reel3: number,
    balance: number
    debug: boolean
    reel1Data?: {
        top: number,
        middle: number,
        bottom: number,
        finished: boolean
    },
    reel2Data?: {
        top: number,
        middle: number,
        bottom: number,
        finished: boolean
    },
    reel3Data?: {
        top: number,
        middle: number,
        bottom: number,
        finished: boolean
    }
    progress: boolean
}

export class Machine extends Component<{}, MachineState>{
    private reel1: any;
    private reel2: any;
    private reel3: any;
    constructor(props: Readonly<{}>) {
        super(props);
        this.initMachine();
        this.triggerChild = this.triggerChild.bind(this)
        this.finishHandler = this.finishHandler.bind(this)
    }

    initMachine(): void {
        this.state = {
            reel1: getRandomNumber(0, DefaultOrder.length - 1),
            reel2: getRandomNumber(0, DefaultOrder.length - 1),
            reel3: getRandomNumber(0, DefaultOrder.length - 1),
            balance: initialBalance,
            debug: false,
            progress: false
        }
    }

    finishHandler(reelNumber: number, topValue: number, midValue: number, bottomValue: number) {
        this.setState({
            ...this.state,
            [`reel${reelNumber}Data`]: {
                top: topValue,
                middle: midValue,
                bottom: bottomValue,
                finished: true
            }
        })
        if (this.state.reel1Data?.finished && this.state.reel2Data?.finished && this.state.reel3Data?.finished) {
            this.setState({
                ...this.state,
                reel1: this.state.reel1Data.middle,
                reel2: this.state.reel2Data.middle,
                reel3: this.state.reel3Data.middle,
                progress: false
            })
            this.checkWin()
        }
    }

    checkWin() {
        const wins = [];
        if (this.state.reel1Data?.top === SymbolType.Cherry && this.state.reel2Data?.top === SymbolType.Cherry && this.state.reel3Data?.top === SymbolType.Cherry) {
            wins.push(1)
        }
    }

    triggerChild() {
        if (this.state.progress || this.state.balance <= 0) {
            return;
        }
        this.setState({
            ...this.state,
            reel1Data: {
                top: 0,
                middle: 0,
                bottom: 0,
                finished: false
            },
            reel2Data: {
                top: 0,
                middle: 0,
                bottom: 0,
                finished: false
            },
            reel3Data: {
                top: 0,
                middle: 0,
                bottom: 0,
                finished: false
            },
            progress: true,
            balance: this.state.balance - 1
        })
        this.reel1.spin();
        this.reel2.spin();
        this.reel3.spin();
    }

    toggleDebug = () => {
        if (this.state.progress) {
            return;
        }
        console.log("debug")
        this.setState({
            debug: !this.state.debug
        })
    }

    updateBalance = (event: any) => {
        if (this.state.progress) {
            return;
        }
        let value = event.target.value;
        if (value < 1) {
            value = 1
        }
        if (value > 5000) {
            value = 5000
        }
        this.setState({
            balance: value
        })
    }

    render(): ReactNode {
        return (
            <Col>
                <Row>
                    <Col sm={12} style={{border: "1px solid black"}}>
                        <Row style={{height: "100%"}}>
                            <Col>
                                <Reel
                                    reelNumber={1}
                                    handler={(reelNumber: number, topValue: number, midValue: number, bottomValue: number) => this.finishHandler(reelNumber, topValue, midValue, bottomValue)}
                                    ref={(reel) => this.reel1 = reel}
                                    middleSymbol={this.state.reel1} />
                            </Col>
                            <Col>
                                <Reel
                                    reelNumber={2}
                                    handler={(reelNumber: number, topValue: number, midValue: number, bottomValue: number) => this.finishHandler(reelNumber, topValue, midValue, bottomValue)}
                                    ref={(reel) => this.reel2 = reel}
                                    middleSymbol={this.state.reel2} />
                            </Col>
                            <Col>
                                <Reel
                                    reelNumber={3}
                                    handler={(reelNumber: number, topValue: number, midValue: number, bottomValue: number) => this.finishHandler(reelNumber, topValue, midValue, bottomValue)}
                                    ref={(reel) => this.reel3 = reel}
                                    middleSymbol={this.state.reel3} />
                            </Col>
                        </Row>
                    </Col>
                    <Col>
                        <Row className="align-content-center justify-content-between">
                            <Col sm={3}>
                                <input value={this.state.balance} onChange={this.updateBalance}/>
                            </Col>
                            <Col sm={3}>
                                <Button onClick={this.triggerChild}>Spin</Button>
                            </Col>
                            <Col sm={5}>
                                <Button onClick={this.toggleDebug}>Debug</Button> Debug enabled: {this.state.debug ? 'true' : 'false'}
                            </Col>
                        </Row>
                    </Col>
                    <Col sm={12}>
                        <PayoutTable />
                    </Col>
                </Row>
            </Col>
        )
    }
}