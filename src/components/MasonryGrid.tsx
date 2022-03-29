import React from "react"
import { Fade } from "react-awesome-reveal"


export type MasonryGridProps = {
    columns: number;
    gap: number;
    children: any;
}
const MasonryGrid = ({ columns = 2, gap = 20, children }: MasonryGridProps) => {
    const columnWrapper: any = [];
    const result = [];

    for (let i = 0; i < columns; i++) {
        columnWrapper[`column${i}`] = [];
    }

    children.map((child: any, index: number) => {
        const columnIndex = index % columns;
        columnWrapper[`column${columnIndex}`].push(
            <Fade
                triggerOnce
                direction='up'
                key={index}
            >
                <div style={{ marginBottom: `${gap}px` }} key={index}>
                    {child}
                </div>
            </Fade>
        )
    })

    for (let i = 0; i < columns; i++) {
        result.push(
            <div
                key={i}
                style={{
                    marginLeft: `${i > 0 ? gap : 0}px`,
                    flex: 1
                }}>
                {columnWrapper[`column${i}`]}
            </div>
        )
    }

    return (
        <div style={{ display: 'flex' }}>
            {result}
        </div>
    )


}

export default MasonryGrid