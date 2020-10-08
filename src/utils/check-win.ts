import {SymbolType} from "../shared/SymbolType";

export const checkWinInRow = (rowNumber: number, values: (SymbolType | undefined)[]) => {
    if (values.join() === [SymbolType.Cherry, SymbolType.Cherry, SymbolType.Cherry].join()) {
        if (rowNumber === 1) {
            return 1
        }

        if (rowNumber === 2) {
            return 2
        }

        if (rowNumber === 3) {
            return 3
        }
    }

    if (values.join() === [SymbolType.Seven, SymbolType.Seven, SymbolType.Seven].join()) {
        return 4
    }

    if (values.join() === [SymbolType.Bar3X, SymbolType.Bar3X, SymbolType.Bar3X].join()) {
        return 5
    }

    if (values.join() === [SymbolType.Bar2X, SymbolType.Bar2X, SymbolType.Bar2X].join()) {
        return 6
    }

    if (values.join() === [SymbolType.Bar, SymbolType.Bar, SymbolType.Bar].join()) {
        return 7
    }

    if (!values.includes(SymbolType.Seven) && !values.includes(SymbolType.Cherry)) {
        return 8
    }

    return 0
}