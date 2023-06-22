import React, { useEffect, useState } from 'react';
import './table.css';

const Table = ({page, limit, fromDate, toDate, sending, setSending}: ITable & { 
    sending: boolean, 
    setSending: React.Dispatch<React.SetStateAction<boolean>> 
}) => {
    const [table, setTable] = useState<ITableInfo>({});
    useEffect(() => {
        if (!setSending) {
            return;
        }
        fetch(`${process.env.BACKEND_SERVER}/statistics?` + new URLSearchParams({
            page: page?.toString() || '',
            limit: limit?.toString() || '',
            fromDate: fromDate || '',
            toDate: toDate || '',
        }))
        .then(response => response.json())
        .then(data => setTable(data))
        .catch(err => {
            setTable({
                "data": [
                    {
                        "source": "\"136440622\"",
                        "count_new_users": "0",
                        "count_old_users": "1",
                        "grit_retention_7d": "0.000",
                        "grit_retention_14d": "0.000",
                        "grit_paid_new_users": "0.000",
                        "sum_revenue_7d": "0.000"
                    },
                    {
                        "source": "\"8269462\"",
                        "count_new_users": "0",
                        "count_old_users": "1",
                        "grit_retention_7d": "0.000",
                        "grit_retention_14d": "0.000",
                        "grit_paid_new_users": "0.000",
                        "sum_revenue_7d": "0.000"
                    }
                ],
                "pagination": {
                    "currentPage": 1,
                    "currentLimit": 2,
                    "totalItems": 472,
                    "totalPages": 236
                }
            })
            console.log(err)
        })
        .finally(() => {
            setSending(false);
        });
    }, [sending]);
    const headers = [
        "Source",
        "Number of new users",
        "Number of old users",
        "Percentage of new users logged into the game 7 days after installation",
        "Percentage of new users logged into the game 14 days after installation",
        "Percentage of new paying users",
        "Revenue from new users by day 7"
    ];
    return (
        <section className='table'>
            {headers.map((el, i) => (
              <div key={i} className='table__header'>
                <h2 className="table__headername" key={i}>{el}</h2>
              </div>
            ))}
            {table?.data?.map((el, i) => 
                <div key={headers.length + i} className='table__row'>
                    {Object.values(el).map((str, j) => 
                        <div key={j} className='table__row_elem'>
                            <span className='table__row_text'>{str}</span>
                        </div>
                    )}
                </div>
            )}
        </section>
    )
}

export default Table;

export interface ITable {
    page?: number;
    limit?: number;
    fromDate?: string;
    toDate?: string;
}

interface ITableInfo {
    data?: {
        source: string;
        count_new_users: string;
        count_old_users: string;
        grit_retention_7d: string;
        grit_retention_14d: string;
        grit_paid_new_users: string;
        sum_revenue_7d: string;
    }[];
    pagination?: {
        currentPage: number;
        currentLimit: number;
        totalItems: number;
        totalPages: number;
    }
};