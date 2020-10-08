import React from 'react';
import {Table} from "react-bootstrap";
import {Symbol} from "../symbol";
import {SymbolType} from "../../shared/SymbolType";

type PayoutTableProps = {
    wins: number[]
}

export const PayoutTable = ({ wins }: PayoutTableProps) =>
    <Table>
        <thead>
            <tr>
                <th>#</th>
                <th>row</th>
                <th>val1</th>
                <th>val2</th>
                <th>val3</th>
                <th>payout</th>
            </tr>
        </thead>
        <tbody>
            <tr className={wins.includes(1) ? 'table-danger' : ''}>
                <td>1</td>
                <td>top</td>
                <td><Symbol height={50} symbolType={SymbolType.Cherry} /></td>
                <td><Symbol height={50} symbolType={SymbolType.Cherry} /></td>
                <td><Symbol height={50} symbolType={SymbolType.Cherry} /></td>
                <td>2000</td>
            </tr>
            <tr className={wins.includes(2) ? 'table-danger' : ''}>
                <td>2</td>
                <td>center</td>
                <td><Symbol height={50} symbolType={SymbolType.Cherry} /></td>
                <td><Symbol height={50} symbolType={SymbolType.Cherry} /></td>
                <td><Symbol height={50} symbolType={SymbolType.Cherry} /></td>
                <td>1000</td>
            </tr>
            <tr className={wins.includes(3) ? 'table-danger' : ''}>
                <td>3</td>
                <td>bottom</td>
                <td><Symbol height={50} symbolType={SymbolType.Cherry} /></td>
                <td><Symbol height={50} symbolType={SymbolType.Cherry} /></td>
                <td><Symbol height={50} symbolType={SymbolType.Cherry} /></td>
                <td>4000</td>
            </tr>
            <tr className={wins.includes(4) ? 'table-danger' : ''}>
                <td>4</td>
                <td>any</td>
                <td><Symbol height={50} symbolType={SymbolType.Seven} /></td>
                <td><Symbol height={50} symbolType={SymbolType.Seven} /></td>
                <td><Symbol height={50} symbolType={SymbolType.Seven} /></td>
                <td>75</td>
            </tr>
            <tr className={wins.includes(5) ? 'table-danger' : ''}>
                <td>5</td>
                <td>any</td>
                <td><Symbol height={50} symbolType={SymbolType.Bar3X} /></td>
                <td><Symbol height={50} symbolType={SymbolType.Bar3X} /></td>
                <td><Symbol height={50} symbolType={SymbolType.Bar3X} /></td>
                <td>50</td>
            </tr>
            <tr className={wins.includes(6) ? 'table-danger' : ''}>
                <td>6</td>
                <td>any</td>
                <td><Symbol height={50} symbolType={SymbolType.Bar2X} /></td>
                <td><Symbol height={50} symbolType={SymbolType.Bar2X} /></td>
                <td><Symbol height={50} symbolType={SymbolType.Bar2X} /></td>
                <td>20</td>
            </tr>
            <tr className={wins.includes(7) ? 'table-danger' : ''}>
                <td>7</td>
                <td>any</td>
                <td><Symbol height={50} symbolType={SymbolType.Bar} /></td>
                <td><Symbol height={50} symbolType={SymbolType.Bar} /></td>
                <td><Symbol height={50} symbolType={SymbolType.Bar} /></td>
                <td>10</td>
            </tr>
            <tr className={wins.includes(8) ? 'table-danger' : ''}>
                <td>8</td>
                <td>any</td>
                <td><Symbol height={50} symbolType={SymbolType.Bar} /></td>
                <td><Symbol height={50} symbolType={SymbolType.Bar2X} /></td>
                <td><Symbol height={50} symbolType={SymbolType.Bar3X} /></td>
                <td>5</td>
            </tr>
        </tbody>
    </Table>