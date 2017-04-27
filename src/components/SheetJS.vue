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
      <tbody>
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
      </tbody>
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
    Json:
    {{ jsonSheet }}
    <br/>
    CSV:
    {{ jsonCSV }}
    <br/>
    <button @click="save('xlsx')">Save as xlsx</button>
    <button @click="save('ods')">Save as ods</button>
  </div>
</template>

<script>
import XLSX from 'xlsx'
import FileSaver from 'file-saver'
export default {
  name: 'sheetjs',
  data () {
    return {
      cell1Type: '',
      cell1Value: '',
      sheetName: '',
      jsonSheet: '',
      jsonCSV: '',
      workbook: {}
    }
  },
  methods: {
    save (type) {
      console.log('Saving!')
      /* bookType can be 'xlsx' or 'xlsm' or 'xlsb' or 'ods' */
      var wopts = { bookType: type, bookSST: false, type: 'binary' }

      var wbout = XLSX.write(this.workbook, wopts)

      function s2ab (s) {
        var buf = new ArrayBuffer(s.length)
        var view = new Uint8Array(buf)
        for (var i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF
        return buf
      }

      /* the saveAs call downloads a file on the local machine */
      FileSaver.saveAs(new Blob([s2ab(wbout)], {type: 'application/octet-stream'}), 'test.' + type)
    }
  },
  mounted () {
    console.log('Mounted!')
    console.log(XLSX)
    var workbook = XLSX.utils.table_to_book(document.getElementById('source'))
    console.log(workbook)
    this.workbook = workbook
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

    // JSON:
    var jsonSheet = XLSX.utils.sheet_to_json(worksheet)
    this.jsonSheet = jsonSheet
    console.log(jsonSheet)

    // CSV
    var jsonCSV = XLSX.utils.sheet_to_csv(worksheet)
    this.jsonCSV = jsonCSV
    console.log(jsonCSV)
  }
}
</script>

