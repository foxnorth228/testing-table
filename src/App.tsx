import React, { useState } from 'react';
import Table, { ITable } from '@components/table/table';
import Filters from './components/filters/filters';

export const App = () => {
  const [filters, setFilters] = useState<ITable>({
    page: 1,
    limit: 25,
    fromDate:(new Date()).toISOString().split('T')[0],
    toDate: (new Date()).toISOString().split('T')[0],
  });
  const [sending, setSending] = useState(false);
  console.log(filters);
  return (
    <>
      <Filters filters={filters} setFilters={setFilters} setSending={setSending} />
      <Table {...filters} sending={sending} setSending={setSending} />
    </>
  );
}
