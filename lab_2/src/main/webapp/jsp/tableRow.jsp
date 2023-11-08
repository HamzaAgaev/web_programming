<%--<%@ page import="javax.servlet.http.HttpSession"%>--%>
<%--<%@ page import="javax.servlet.ServletContext" %>--%>
<%--<%@ page import="javax.servlet.ServletConfig" %>--%>
<%--<%@ page import="java.util.ArrayList" %>--%>
<%@ page import="java.util.List" %>

<%
    List<List<String>> result = (List<List<String>>) session.getAttribute("results");
    if (result != null) {
        for (List<String> row: result) {
            %><tr><%
            for (String value: row) {
                %><td><%=value%></td><%
            }
            %></tr>
<%
        }
    }
%>
