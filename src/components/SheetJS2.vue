<template>
  <div id="sheetjs">
    <h1>Example parsing form HTML table:</h1>
    <h2>Source Table:</h2>
    <table id="source">
      <thead>
        <td>Column 1</td>
        <td>Column 2</td>
        <td>Column 3</td>
      </thead>
      <tr>
        <td>1</td>
        <td>2</td>
        <td>3</td>
      </tr>
      <tr>
        <td>4</td>
        <td>5</td>
        <td>6</td>
      </tr>
      <tr>
        <td>7</td>
        <td>8</td>
        <td>9</td>
      </tr>
      <tr>
        <td>10</td>
        <td>11</td>
        <td>12</td>
      </tr>
    </table>
    <h2>Sheet info (from parsed table):</h2>

    Sheet:
    <ul>
      <li>Sheet name: {{ sheetName }}</li>
    </ul>
    Cell 1:
    <ul>

      <li>Type: {{cell1Type}}</li>
      <li>Value: {{cell1Value}}</li>
    </ul>
  </div>
</template>

<script>
import XLSX from 'xlsx'
export default {
  name: 'sheetjs',
  data () {
    return {
      cell1Type: '',
      cell1Value: '',
      sheetName: ''
    }
  },
  mounted () {
    console.log('Mounted!')
    console.log(XLSX)
    var workbook = XLSX.utils.table_to_book(document.getElementById('source'))
    console.log(workbook)

    var firstSheetName = workbook.SheetNames[0]
    console.log('Sheet name: ' + firstSheetName)
    this.sheetName = firstSheetName
    var AddressOfCell = 'A1'

    /* Get worksheet */
    var worksheet = workbook.Sheets[firstSheetName]

    /* Find desired cell */
    var desiredCell = worksheet[AddressOfCell]
    console.log(desiredCell)

    /* Get the value */
    var cell1Value = (desiredCell ? desiredCell.v : undefined)
    var cell1Type = (desiredCell ? desiredCell.t : undefined)
    console.log(cell1Value)
    this.cell1Type = cell1Type
    this.cell1Value = cell1Value
  }
}
</script>

