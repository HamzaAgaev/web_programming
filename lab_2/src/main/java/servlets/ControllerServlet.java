package servlets;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.math.BigDecimal;
import javax.servlet.ServletException;

public class ControllerServlet extends HttpServlet {
    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response)
            throws IOException, ServletException {
        String needTable = request.getParameter("getTable");

        if (needTable != null) {
            request.getRequestDispatcher("jsp/tableRow.jsp").forward(request, response);
        } else {
            request.getRequestDispatcher("index.jsp").forward(request, response);
        }
    }

    private final static int GOOD_COORDS = 0;
    private final static int STR_NOT_NUM = 1;
    private final static int OUT_OF_RANGE = 2;
    private final static int EMPTY_VALUE = 3;
    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response)
            throws IOException, ServletException{
        String xStr = request.getParameter("x");
        String yStr = request.getParameter("y");
        String RStr = request.getParameter("R");

        try {
            BigDecimal x = new BigDecimal(xStr);
            BigDecimal y = new BigDecimal(yStr);
            BigDecimal R = new BigDecimal(RStr);

            if (!xStr.equals("null") && !yStr.equals("null") && !RStr.equals("null")) {
                if (x.toString().equals(xStr) && y.toString().equals(yStr) && R.toString().equals(RStr)) {
                    if (x.compareTo(new BigDecimal(-3)) >= 0 && x.compareTo(new BigDecimal(5)) <= 0
                            && y.compareTo(new BigDecimal(-3)) >= 0 && y.compareTo(new BigDecimal(3)) <= 0
                            && R.compareTo(new BigDecimal(0)) > 0 && R.compareTo(new BigDecimal(5)) <= 0) {
                        request.setAttribute("coordStatus", ControllerServlet.GOOD_COORDS);
                        request.getRequestDispatcher("/areaCheck").forward(request, response);
                        return;
                    } else {
                        request.setAttribute("coordStatus", ControllerServlet.OUT_OF_RANGE);
                    }
                } else {
                    request.setAttribute("coordStatus", ControllerServlet.STR_NOT_NUM);
                }
            } else {
                request.setAttribute("coordStatus", ControllerServlet.EMPTY_VALUE);
            }
//            request.getRequestDispatcher("jsp/error.jsp").forward(request, response);

        } catch (NumberFormatException NFE) {
            request.setAttribute("coordStatus", ControllerServlet.STR_NOT_NUM);
//            request.getRequestDispatcher("jsp/error.jsp").forward(request, response);
        }
    }
}