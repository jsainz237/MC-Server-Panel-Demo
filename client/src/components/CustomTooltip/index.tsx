import React from 'react';
import './styles.scss';
import { numWithCommas } from '../../utils/numWithCommas';

interface CustomTooltipProps {
    active: boolean;
    payload: any;
    label: string;
    labelFormatter?: (str: string) => string;
}

export const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label, labelFormatter }) => {
    return !active ? null : (
        <div className='custom-tooltip-wrapper'>
            <div className="custom-tooltip">
                <p><strong className='custom-tooltip-label'>{ labelFormatter ? labelFormatter(label) : label }</strong></p>
                {
                    payload.map((dataItem: any) => 
                        <p className='tooltip-data' key={dataItem.name}>
                            <strong>{dataItem.name}</strong>: {numWithCommas(dataItem.value) + `${dataItem.name === 'cpu_perc' ? '%' : ''}`}
                        </p>
                    )
                }
            </div>
        </div>
    )
}