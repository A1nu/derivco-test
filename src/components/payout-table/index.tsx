import React from 'react';
import {Table} from "react-bootstrap";
import {Symbol} from "../symbol";
import {SymbolType} from "../../shared/SymbolType";

export const PayoutTable = () =>
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
            <tr>
                <td>1</td>
                <td>top</td>
                <td><Symbol height={50} symbolType={SymbolType.Cherry} /></td>
                <td><Symbol height={50} symbolType={SymbolType.Cherry} /></td>
                <td><Symbol height={50} symbolType={SymbolType.Cherry} /></td>
                <td>2000</td>
            </tr>
            <tr>
                <td>2</td>
                <td>top</td>
                <td><Symbol height={50} symbolType={SymbolType.Cherry} /></td>
                <td><Symbol height={50} symbolType={SymbolType.Cherry} /></td>
                <td><Symbol height={50} symbolType={SymbolType.Cherry} /></td>
                <td>2000</td>
            </tr>
            <tr>
                <td>3</td>
                <td>bottom</td>
                <td><Symbol height={50} symbolType={SymbolType.Cherry} /></td>
                <td><Symbol height={50} symbolType={SymbolType.Cherry} /></td>
                <td><Symbol height={50} symbolType={SymbolType.Cherry} /></td>
                <td>4000</td>
            </tr>
            <tr>
                <td>4</td>
                <td>any</td>
                <td><Symbol height={50} symbolType={SymbolType.Seven} /></td>
                <td><Symbol height={50} symbolType={SymbolType.Seven} /></td>
                <td><Symbol height={50} symbolType={SymbolType.Seven} /></td>
                <td>75</td>
            </tr>
            <tr>
                <td>5</td>
                <td>any</td>
                <td><Symbol height={50} symbolType={SymbolType.Bar3X} /></td>
                <td><Symbol height={50} symbolType={SymbolType.Bar3X} /></td>
                <td><Symbol height={50} symbolType={SymbolType.Bar3X} /></td>
                <td>50</td>
            </tr>
            <tr>
                <td>6</td>
                <td>any</td>
                <td><Symbol height={50} symbolType={SymbolType.Bar2X} /></td>
                <td><Symbol height={50} symbolType={SymbolType.Bar2X} /></td>
                <td><Symbol height={50} symbolType={SymbolType.Bar2X} /></td>
                <td>20</td>
            </tr>
            <tr>
                <td>7</td>
                <td>any</td>
                <td><Symbol height={50} symbolType={SymbolType.Bar} /></td>
                <td><Symbol height={50} symbolType={SymbolType.Bar} /></td>
                <td><Symbol height={50} symbolType={SymbolType.Bar} /></td>
                <td>10</td>
            </tr>
            <tr>
                <td>8</td>
                <td>any</td>
                <td><Symbol height={50} symbolType={SymbolType.Bar} /></td>
                <td><Symbol height={50} symbolType={SymbolType.Bar2X} /></td>
                <td><Symbol height={50} symbolType={SymbolType.Bar3X} /></td>
                <td>5</td>
            </tr>
        </tbody>
    </Table>