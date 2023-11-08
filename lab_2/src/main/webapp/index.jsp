<%@ page contentType="text/html; charset=UTF-8" %>

<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Agaev Hamza Lab 2</title>
        <link rel="stylesheet" href="${pageContext.request.contextPath}/static/style.css">
        <script src="${pageContext.request.contextPath}/static/script.js"></script>
    </head>
    <body>
        <div class="page_head">
            <span class="ph_text">
                Агаев Хамза Рустам оглы
            </span>
            <span class="ph_text">
                Группа: P3234
            </span>
            <span class="ph_text">
                Номер варианта: 3407
            </span>
        </div>
        <div class="main_content">
            <div class="coords">
                <span id="x_coord">X: </span>
                <span id="y_coord">Y: </span>
                <span id="radius">Radius: </span>
            </div>
            <div class="form_block">
                <form method="post" action="">
                    <label class="label_text">X Value</label>
                    <input type="hidden" name="x" value="0">
                    <label for="ix1" class="label_text">-3</label>
                    <input id="ix1" class="input_x" type="checkbox" value="-3" onclick="setX(-3)">
                    <label for="ix2" class="label_text">-2</label>
                    <input id="ix2" class="input_x" type="checkbox" value="-2" onclick="setX(-2)">
                    <label for="ix3" class="label_text">-1</label>
                    <input id="ix3" class="input_x" type="checkbox" value="-1" onclick="setX(-1)">
                    <label for="ix4" class="label_text">0</label>
                    <input id="ix4" class="input_x" type="checkbox" value="0" checked onclick="setX(0)">
                    <label for="ix5" class="label_text">1</label>
                    <input id="ix5" class="input_x" type="checkbox" value="1" onclick="setX(1)">
                    <label for="ix6" class="label_text">2</label>
                    <input id="ix6" class="input_x" type="checkbox" value="2" onclick="setX(2)">
                    <label for="ix7" class="label_text">3</label>
                    <input id="ix7" class="input_x" type="checkbox" value="3" onclick="setX(3)">
                    <label for="ix8" class="label_text">4</label>
                    <input id="ix8" class="input_x" type="checkbox" value="4" onclick="setX(4)">
                    <label for="ix9" class="label_text">5</label>
                    <input id="ix9" class="input_x" type="checkbox" value="5" onclick="setX(5)">

                    <label for="iy" class="label_text">Y Value</label>
                    <input id="iy" type="text" name="y" value="0" placeholder="[-3, ..., 3]" onchange="getXAndY()" maxlength="7">

                    <label for="iR" class="label_text">Radius value</label>
                    <select id="iR" name="R" onchange="getXAndY()">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    <input type="button" id="send" value="Submit">
                </form>
            </div>
            <canvas id="canvas" width="300px" height="300px">

            </canvas>
            <span id="info_text">Information about requests will be displayed here.</span>
            <div class="table_block">
                <table id="results_table">
                    <tr>
                        <th>Current Date</th>
                        <th>Execution time, µs</th>
                        <th>X</th>
                        <th>Y</th>
                        <th>Radius</th>
                        <th>In area</th>
                    </tr>
                </table>
            </div>
        </div>
    </body>
</html>