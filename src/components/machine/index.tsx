import React, {Component, ReactNode} from 'react';
import {Button, Col, Dropdown, DropdownButton, Row} from "react-bootstrap";
import {Reel} from "../reel";
import {getRandomNumber} from "../../utils/randomizer";
import {DefaultOrder, initialBalance} from "../../shared/config";
import {PayoutTable} from "../payout-table";
import {checkWinInRow} from "../../utils/check-win";
import {SymbolType} from "../../shared/SymbolType";
import {Symbol} from "../symbol";

type MachineState = {
    reel1: number,
    reel2: number,
    reel3: number,
    balance: number
    debug: boolean,
    debugContext: {
        row: number,
        values: SymbolType[]
    }
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
    rowWin: boolean[]
    winCombinations: number[]
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
            debugContext: {
                row: 1,
                values: [SymbolType.Cherry, SymbolType.Cherry, SymbolType.Cherry]
            },
            progress: false,
            rowWin: [false, false, false],
            winCombinations: []
        }
    }

    finishHandler(reelNumber: number, topValue: number, midValue: number, bottomValue: number):void {
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

    checkWin(): void {
        const row1combination = checkWinInRow(1, [this.state.reel1Data?.top, this.state.reel2Data?.top, this.state.reel3Data?.top])
        const row2combination = checkWinInRow(2, [this.state.reel1Data?.middle, this.state.reel2Data?.middle, this.state.reel3Data?.middle])
        const row3combination = checkWinInRow(3, [this.state.reel1Data?.bottom, this.state.reel2Data?.bottom, this.state.reel3Data?.bottom])

        let rowWin = [false, false, false]
        const winCombinations = []

        if (row1combination !== 0) {
            rowWin[0] = true
            winCombinations.push(row1combination)
        }

        if (row2combination !== 0) {
            rowWin[1] = true
            winCombinations.push(row2combination)
        }

        if (row3combination !== 0) {
            rowWin[2] = true
            winCombinations.push(row3combination)
        }

        this.setState({
            ...this.state,
            rowWin: rowWin,
            winCombinations: winCombinations
        })

        this.addFunds()
    }

    addFunds():void {
        let balance = this.state.balance

        this.state.winCombinations.forEach(combination => {
            switch (combination) {
                case 1:
                    balance += 2000
                    break
                case 2:
                    balance += 1000
                    break
                case 3:
                    balance += 4000
                    break
                case 4:
                    balance += 75
                    break
                case 5:
                    balance += 50
                    break
                case 6:
                    balance += 20
                    break
                case 7:
                    balance += 10
                    break
                case 8:
                    balance += 5
                    break
            }
        })

        if (this.state.balance !== balance) {
            this.setState({
                ...this.state,
                balance: balance
            })
        }
    }

    triggerChild(): void {
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
            balance: this.state.balance - 1,
            winCombinations: [],
            rowWin: [false, false, false]
        })
        this.reel1.spin();
        this.reel2.spin();
        this.reel3.spin();
    }

    toggleDebug = ():void => {
        if (this.state.progress) {
            return;
        }
        console.log("debug")
        this.setState({
            debug: !this.state.debug
        })
    }

    updateBalance = (event: any): void => {
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

    updateDebugContextRow = (number: number) => {
        this.setState({
            ...this.state,
            debugContext: {
                ...this.state.debugContext,
                row: number
            }
        })
    }

    updateReelDebugValue = (reelNumber: number, value: SymbolType) => {
        let values = this.state.debugContext.values
        values[reelNumber] = value
        this.setState({
            ...this.state,
            debugContext: {
                ...this.state.debugContext,
                values: values
            }
        })
    }

    render(): ReactNode {
        return (
            <Col>
                <Row>
                    <Col sm={12} style={{border: "1px solid black"}}>
                        <Row style={{height: "100%", position: "relative"}}>
                            {
                                this.state.rowWin[0] && (<div style={{
                                    position: 'absolute',
                                    zIndex: 10,
                                    backgroundColor: 'red',
                                    height: '33%',
                                    width: '100%',
                                    opacity: 0.3
                                }}/>)
                            }

                            {
                                this.state.rowWin[1] && (<div style={{
                                    position: 'absolute',
                                    zIndex: 10,
                                    backgroundColor: 'red',
                                    height: '33%',
                                    width: '100%',
                                    opacity: 0.3,
                                    top: '33%'
                                }}/>)
                            }

                            {
                                this.state.rowWin[2] && (<div style={{
                                    position: 'absolute',
                                    zIndex: 10,
                                    backgroundColor: 'red',
                                    height: '34%',
                                    width: '100%',
                                    opacity: 0.3,
                                    top: '66%'
                                }}/>)
                            }

                            <Col>
                                <Reel
                                    debug={this.state.debug}
                                    debugContext={this.state.debug ? {row: this.state.debugContext.row, value: this.state.debugContext.values[0]} : undefined}
                                    reelNumber={1}
                                    handler={(reelNumber: number, topValue: number, midValue: number, bottomValue: number) => this.finishHandler(reelNumber, topValue, midValue, bottomValue)}
                                    ref={(reel) => this.reel1 = reel}
                                    middleSymbol={this.state.reel1} />
                            </Col>
                            <Col>
                                <Reel
                                    debug={this.state.debug}
                                    debugContext={this.state.debug ? {row: this.state.debugContext.row, value: this.state.debugContext.values[1]} : undefined}
                                    reelNumber={2}
                                    handler={(reelNumber: number, topValue: number, midValue: number, bottomValue: number) => this.finishHandler(reelNumber, topValue, midValue, bottomValue)}
                                    ref={(reel) => this.reel2 = reel}
                                    middleSymbol={this.state.reel2} />
                            </Col>
                            <Col>
                                <Reel
                                    debug={this.state.debug}
                                    debugContext={this.state.debug ? {row: this.state.debugContext.row, value: this.state.debugContext.values[2]} : undefined}
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
                            {this.state.debug &&
                            (<Col sm={12}>
                                <Row>
                                    <Col sm={1}>
                                        <DropdownButton id="dropdown-item-button" title="Row">
                                            <Dropdown.Item as="button" onClick={() => this.updateDebugContextRow(1)}>1</Dropdown.Item>
                                            <Dropdown.Item as="button" onClick={() => this.updateDebugContextRow(2)}>2</Dropdown.Item>
                                            <Dropdown.Item as="button" onClick={() => this.updateDebugContextRow(3)}>3</Dropdown.Item>
                                        </DropdownButton>
                                    </Col>
                                    <Col sm={1}>
                                        {this.state.debugContext.row !== 0 && (<span>Row: {this.state.debugContext.row}</span>)}
                                    </Col>

                                    <Col sm={1}>
                                        <DropdownButton id="dropdown-item-button" title="reel1">
                                            <Dropdown.Item as="button" onClick={() => this.updateReelDebugValue(0, SymbolType.Cherry)}>
                                                <Symbol symbolType={SymbolType.Cherry} height={20} />
                                            </Dropdown.Item>
                                            <Dropdown.Item as="button" onClick={() => this.updateReelDebugValue(0, SymbolType.Seven)}>
                                                <Symbol symbolType={SymbolType.Seven} height={20} />
                                            </Dropdown.Item>
                                            <Dropdown.Item as="button" onClick={() => this.updateReelDebugValue(0, SymbolType.Bar)}>
                                                <Symbol symbolType={SymbolType.Bar} height={20} />
                                            </Dropdown.Item>
                                            <Dropdown.Item as="button" onClick={() => this.updateReelDebugValue(0, SymbolType.Bar3X)}>
                                                <Symbol symbolType={SymbolType.Bar3X} height={20} />
                                            </Dropdown.Item>
                                            <Dropdown.Item as="button" onClick={() => this.updateReelDebugValue(0, SymbolType.Bar2X)}>
                                                <Symbol symbolType={SymbolType.Bar2X} height={20} />
                                            </Dropdown.Item>
                                            <Dropdown.Item as="button" onClick={() => this.updateReelDebugValue(0, SymbolType.Bar)}>
                                                <Symbol symbolType={SymbolType.Bar} height={20} />
                                            </Dropdown.Item>
                                        </DropdownButton>
                                    </Col>
                                    <Col sm={2}>
                                        {this.state.debugContext.values[0] !== 0 && (<span><Symbol symbolType={this.state.debugContext.values[0]} height={20} /></span>)}
                                    </Col>

                                    <Col sm={1}>
                                        <DropdownButton id="dropdown-item-button" title="reel2">
                                            <Dropdown.Item as="button" onClick={() => this.updateReelDebugValue(1, SymbolType.Cherry)}>
                                                <Symbol symbolType={SymbolType.Cherry} height={20} />
                                            </Dropdown.Item>
                                            <Dropdown.Item as="button" onClick={() => this.updateReelDebugValue(1, SymbolType.Seven)}>
                                                <Symbol symbolType={SymbolType.Seven} height={20} />
                                            </Dropdown.Item>
                                            <Dropdown.Item as="button" onClick={() => this.updateReelDebugValue(1, SymbolType.Bar)}>
                                                <Symbol symbolType={SymbolType.Bar} height={20} />
                                            </Dropdown.Item>
                                            <Dropdown.Item as="button" onClick={() => this.updateReelDebugValue(1, SymbolType.Bar3X)}>
                                                <Symbol symbolType={SymbolType.Bar3X} height={20} />
                                            </Dropdown.Item>
                                            <Dropdown.Item as="button" onClick={() => this.updateReelDebugValue(1, SymbolType.Bar2X)}>
                                                <Symbol symbolType={SymbolType.Bar2X} height={20} />
                                            </Dropdown.Item>
                                            <Dropdown.Item as="button" onClick={() => this.updateReelDebugValue(1, SymbolType.Bar)}>
                                                <Symbol symbolType={SymbolType.Bar} height={20} />
                                            </Dropdown.Item>
                                        </DropdownButton>
                                    </Col>
                                    <Col sm={2}>
                                        {this.state.debugContext.values[0] !== 0 && (<span><Symbol symbolType={this.state.debugContext.values[1]} height={20} /></span>)}
                                    </Col>

                                    <Col sm={1}>
                                        <DropdownButton id="dropdown-item-button" title="reel3">
                                            <Dropdown.Item as="button" onClick={() => this.updateReelDebugValue(2, SymbolType.Cherry)}>
                                                <Symbol symbolType={SymbolType.Cherry} height={20} />
                                            </Dropdown.Item>
                                            <Dropdown.Item as="button" onClick={() => this.updateReelDebugValue(2, SymbolType.Seven)}>
                                                <Symbol symbolType={SymbolType.Seven} height={20} />
                                            </Dropdown.Item>
                                            <Dropdown.Item as="button" onClick={() => this.updateReelDebugValue(2, SymbolType.Bar)}>
                                                <Symbol symbolType={SymbolType.Bar} height={20} />
                                            </Dropdown.Item>
                                            <Dropdown.Item as="button" onClick={() => this.updateReelDebugValue(2, SymbolType.Bar3X)}>
                                                <Symbol symbolType={SymbolType.Bar3X} height={20} />
                                            </Dropdown.Item>
                                            <Dropdown.Item as="button" onClick={() => this.updateReelDebugValue(2, SymbolType.Bar2X)}>
                                                <Symbol symbolType={SymbolType.Bar2X} height={20} />
                                            </Dropdown.Item>
                                            <Dropdown.Item as="button" onClick={() => this.updateReelDebugValue(2, SymbolType.Bar)}>
                                                <Symbol symbolType={SymbolType.Bar} height={20} />
                                            </Dropdown.Item>
                                        </DropdownButton>
                                    </Col>
                                    <Col sm={2}>
                                        {this.state.debugContext.values[0] !== 0 && (<span><Symbol symbolType={this.state.debugContext.values[2]} height={20} /></span>)}
                                    </Col>
                                </Row>
                            </Col>)
                            }
                        </Row>
                    </Col>
                    <Col sm={12}>
                        <PayoutTable wins={this.state.winCombinations}/>
                    </Col>
                </Row>
            </Col>
        )
    }
}