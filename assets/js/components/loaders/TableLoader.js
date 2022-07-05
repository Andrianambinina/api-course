import React, { Fragment } from 'react';
import ContentLoader from 'react-content-loader';

const TableLoader = props => {
    const { rows = 10 } = props
    const rowHeight = 60

    return (
        <ContentLoader viewBox={`0 0 1500 ${rowHeight * rows}`} {...props}>
            {new Array(rows).fill(' ').map((el, index) => {
                const contentVerticalPosition = contentHeight =>
                    rows > 1 ? contentHeight + rowHeight * index : contentHeight
                return (
                    <Fragment key={index}>
                        <rect
                            x="20"
                            y={`${contentVerticalPosition(20)}`}
                            rx="4"
                            ry="4"
                            width="40"
                            height="20"
                        />
                        <rect
                            x="110"
                            y={`${contentVerticalPosition(20)}`}
                            rx="10"
                            ry="4"
                            width="250"
                            height="20"
                        />
                        <rect
                            x="410"
                            y={`${contentVerticalPosition(20)}`}
                            rx="10"
                            ry="4"
                            width="250"
                            height="20"
                        />
                        <rect
                            x="710"
                            y={`${contentVerticalPosition(20)}`}
                            rx="10"
                            ry="4"
                            width="250"
                            height="20"
                        />
                        <rect
                            x="1010"
                            y={`${contentVerticalPosition(20)}`}
                            rx="10"
                            ry="4"
                            width="250"
                            height="20"
                        />
                        <rect
                            x="1310"
                            y={`${contentVerticalPosition(20)}`}
                            rx="4"
                            ry="4"
                            width="40"
                            height="20"
                        />
                        <rect
                            x="1400"
                            y={`${contentVerticalPosition(20)}`}
                            rx="4"
                            ry="4"
                            width="40"
                            height="20"
                        />
                        <rect
                            y={`${contentVerticalPosition(59)}`}
                            x="10"
                            ry="10"
                            width="1500"
                            height="1"
                        />
                    </Fragment>
                )
            })}
        </ContentLoader>
    );
}
TableLoader.metadata = {
    name: 'Lukas Werner',
    github: 'sherpaPSX',
    description:
        'Repeatable table rows. You can easily define number of rows in props and generate then in one svg',
    filename: 'TableLoader',
}

export default TableLoader;