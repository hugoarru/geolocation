<script lang="ts">
  import { onMount } from 'svelte';
  import Papa from 'papaparse';

  interface Row {
    [key: string]: string;
  }

  let data: Row[] = [];

  onMount(async () => {
    const response = await fetch('bnlc.csv');
    const reader = response.body.getReader();
    const result = await reader.read();
    const decoder = new TextDecoder('utf-8');
    const csv = decoder.decode(result.value);
    const parsed = Papa.parse(csv, { header: true });
    data = parsed.data;
  });
</script>

<table>
  <thead>
    <tr>
      {#if data.length > 0}
        {#each Object.keys(data[0]) as column}
          <th>{column}</th>
        {/each}
      {/if}
    </tr>
  </thead>
  <tbody>
    {#if data.length > 0}
      {#each data as row}
        <tr>
          {#each Object.values(row) as cell}
            <td>{cell}</td>
          {/each}
        </tr>
      {/each}
    {:else}
      <tr>
        <td colspan="{data.length}">Loading...</td>
      </tr>
    {/if}
  </tbody>
</table>

<style>
  table {
    width: 100%;
    border-collapse: collapse;
  }

  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }

  th {
    background-color: #f2f2f2;
  }
</style>
