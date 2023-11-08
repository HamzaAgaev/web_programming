<%@ page contentType="text/html;charset=UTF-8" language="java" isErrorPage="true"%>
<%--<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>--%>
<%--<c:set var="statusCode" scope="request" value="<%= response.getStatus()%>"/>--%>
<html>
<head>
    <title>There are Errors.</title>
</head>
<body>
    <h1>There are errors in your request.</h1>
    <%
        int CoordStatusCode = (int) request.getAttribute("coordStatus");
        System.out.println(CoordStatusCode);
    %>
</body>
</html>