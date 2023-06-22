import React from 'react';
import './filters.css';
import { ITable } from '../table/table';

interface IFilters {
    filters: ITable;
    setFilters: React.Dispatch<React.SetStateAction<ITable>>;
    setSending: React.Dispatch<React.SetStateAction<boolean>>;
}

const Filters = ({filters, setFilters, setSending}: IFilters) => {
    return (
      <form onSubmit={(e) => {
        e.preventDefault();
        setSending(true);
      }} className='filters'>
        <label className='filters__label'>
            Page
            <input min='1' value={filters.page} type='number' onChange={
                (e: React.ChangeEvent<HTMLInputElement>) => {
                    const isDigits = /^\d+$/.test(e.currentTarget.value);
                    const num = Number(e.currentTarget.value);
                    if(isDigits && !isNaN(num) && num !== 0) {
                        setFilters({...filters, page: num});
                    }
                }
            }/>
        </label>
        <label className='filters__label'>
            Limit
            <select onChange={(e) => {
                const value = e.target;
                setFilters({...filters, limit: Number(value.options[value.selectedIndex].value) })
            }}>
                <option defaultChecked={true} value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
            </select>
        </label>
        <label className='filters__label'>
            From date
            <input value={filters.fromDate} onChange={(e) => {
                setFilters({...filters, fromDate: e.currentTarget.value.split('T')[0],})
            }} type='date' />
        </label>
        <label className='filters__label'>
            To date
            <input value={filters.toDate} onChange={(e) => {
                setFilters({...filters, toDate: e.currentTarget.value.split('T')[0],})
            }} type='date' />
        </label>
        <button type="submit">Send</button>
      </form>
    );
}

export default Filters;
