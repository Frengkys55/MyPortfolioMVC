using System;

namespace MyPortfolioMVC.Classes
{
    public static class ErrorClass
    {
        public static string standarError(Exception exception)
        {
            string errorText = string.Empty;

            errorText = "<div class=\"w3-border w3-border-red w3-margin-top\">\n";
            errorText += "    <header class=\"w3-container w3-red\">\n";
            errorText += "        <h4>&#65377;&#65381;&#65439;&#65439;*(>&#1076;<)*&#65439;&#65439;&#65381;&#65377; ERROR!!!</h4>\n";
            errorText += "    </header>\n";
            errorText += "    <div class=\"w3-container\">\n";
            errorText += "        <p>" + exception.Message + "</p>\n";
            errorText += "    </div>\n";
            errorText += "    <footer class=\"w3-container w3-border-top\">\n";
            errorText += "        <p>Developer: (&#9583;&deg;&#9633;&deg;&#65289;&#9583;&#65077; &#9531;&#9473;&#9531;</p>\n";
            errorText += "    </footer>\n";
            errorText += "</div>\n";

            return errorText;
        }

        public static string standardError(Exception exception, string judul)
        {
            string errorText = string.Empty;

            errorText = "<div class=\"w3-border w3-border-red w3-margin-top\">\n";
            errorText += "    <header class=\"w3-container w3-red\">\n";
            errorText += "        <h4>" + judul + "</h4>\n";
            errorText += "    </header>\n";
            errorText += "    <div class=\"w3-container\">\n";
            errorText += "        <p>" + exception.Message + "</p>\n";
            errorText += "    </div>\n";
            errorText += "    <footer class=\"w3-container w3-border-top\">\n";
            errorText += "        <p>Developer: (&#9583;&deg;&#9633;&deg;&#65289;&#9583;&#65077; &#9531;&#9473;&#9531;</p>\n";
            errorText += "    </footer>\n";
            errorText += "</div>\n";

            return errorText;
        }

        public static string standardError(string judul, string isi)
        {
            string errorText = string.Empty;

            errorText = "<div class=\"w3-border w3-border-red w3-margin-top\">\n";
            errorText += "    <header class=\"w3-container w3-red\">\n";
            errorText += "        <h4>" + judul + "</h4>\n";
            errorText += "    </header>\n";
            errorText += "    <div class=\"w3-container\">\n";
            errorText += "        <p>" + isi + "</p>\n";
            errorText += "    </div>\n";
            errorText += "    <footer class=\"w3-container w3-border-top\">\n";
            errorText += "        <p>Developer: (&#9583;&deg;&#9633;&deg;&#65289;&#9583;&#65077; &#9531;&#9473;&#9531;</p>\n";
            errorText += "    </footer>\n";
            errorText += "</div>\n";

            return errorText;
        }

        public static string standardError(string judul, string isi, string pesanDeveloper)
        {
            string errorText = string.Empty;

            errorText = "<div class=\"w3-border w3-border-red w3-margin-top\">\n";
            errorText += "    <header class=\"w3-container w3-red\">\n";
            errorText += "        <h4>" + judul + "</h4>\n";
            errorText += "    </header>\n";
            errorText += "    <div class=\"w3-container\">\n";
            errorText += "        <p>" + isi + "</p>\n";
            errorText += "    </div>\n";
            errorText += "    <footer class=\"w3-container w3-border-top\">\n";
            errorText += "        <p>Developer: " + pesanDeveloper + "</p>\n";
            errorText += "    </footer>\n";
            errorText += "</div>\n";

            return errorText;
        }

        public static string standardErrorWithImage(string judul, string isi, string urlGambar, bool withMessage = true)
        {
            string errorText = string.Empty;

            errorText = "<div class=\"w3-border w3-border-red w3-margin-top\">\n";
            errorText += "    <div class=\"w3-cell-row\">\n";
            errorText += "        <div class=\"w3-cell w3-cell-middle w3-center w3-mobile\" style=\"width: 150px; padding: 8px 8px 8px 8px; \">\n";
            errorText += "            <img src=\"" + urlGambar + "\" style=\"width: 100%;\" class=\"w3-image\" \\>\n";
            errorText += "        </div>\n";
            errorText += "        <div class=\"w3-cell w3-mobile w3-padding w3-red\">\n";
            errorText += "            <header>\n";
            errorText += "                <h4><b>" + judul + "</b></h4>\n";
            errorText += "            </header>\n";
            errorText += "            <div>\n";
            errorText += "                <p>" + isi + "</p>\n";
            errorText += "            </div>\n";
            errorText += "        </div>\n";
            errorText += "    </div>\n";
            if (withMessage == true)
            {
                errorText += "    <footer class=\"w3-container w3-border-top\">\n";
                errorText += "        <p>Developer: (&#9583;&deg;&#9633;&deg;&#65289;&#9583;&#65077; &#9531;&#9473;&#9531;</p>\n";
                errorText += "    </footer>\n";
            }
            errorText += "</div>\n";

            return errorText;
        }

        public static string standardErrorWithImage(string judul, string isi, string urlGambar, string pesanDeveloper)
        {
            string errorText = string.Empty;

            errorText = "<div class=\"w3-border w3-border-red w3-margin-top\">\n";
            errorText += "    <div class=\"w3-cell-row\">\n";
            errorText += "        <div class=\"w3-cell w3-cell-middle w3-center w3-mobile\" style=\"width: 150px; padding: 8px 8px 8px 8px; \">\n";
            errorText += "            <img src=\"" + urlGambar + "\" style=\"width: 100%;\" class=\"w3-image\" \\>\n";
            errorText += "        </div>\n";
            errorText += "        <div class=\"w3-cell w3-mobile w3-padding w3-red\">\n";
            errorText += "            <header>\n";
            errorText += "                <h4><b>" + judul + "</b></h4>\n";
            errorText += "            </header>\n";
            errorText += "            <div>\n";
            errorText += "                <p>" + isi + "</p>\n";
            errorText += "            </div>\n";
            errorText += "        </div>\n";
            errorText += "    </div>\n";
            errorText += "    <footer class=\"w3-container w3-border-top\">\n";
            errorText += "        <p>Developer: " + pesanDeveloper + "</p>\n";
            errorText += "    </footer>\n";
            errorText += "</div>\n";

            return errorText;
        }
    }
}
