using System.Collections.Generic;

namespace MyPortfolioMVC.Classes
{
    public class HTMLGenerator
    {
        public static string BuatHTML(List<KeyValuePair<string, string>> collection)
        {
            string halamanPreview = string.Empty;

            halamanPreview = string.Empty;
            KeyValuePair<string, string> item;
            for (int i = 0; i < collection.Count; i++)
            {
                item = new KeyValuePair<string, string>(collection[i].Key, collection[i].Value);


                if (item.Key == "Header")
                {
                    halamanPreview += "<h3>" + item.Value + "</h3>\n";
                }
                else if (item.Key == "Gambar")
                {
                    halamanPreview += "<img class=\"w3-image w3-block\" src=\"" + item.Value.Split('|')[0] + "\" alt=\"" + item.Value.Split('|')[1] + "\" />\n";
                    if (item.Value.Split('|')[1].ToLower() != "gambar")
                    {
                        halamanPreview += "<div class=\"w3-black w3-container\">\n";
                        halamanPreview += "    " + item.Value.Split('|')[1] + "\n";
                        halamanPreview += "</div>\n";
                    }
                    if (item.Value.Split('|').Length == 3)
                    {
                        halamanPreview += "<div class=\"w3-black w3-container\">\n";
                        halamanPreview += "    Sumber: " + item.Value.Split('|')[2] + "\n";
                        halamanPreview += "</div>\n";
                    }
                }
                else if (item.Key == "Paragraf")
                {
                    halamanPreview += "<p>" + item.Value + "</p>\n";
                }
                else if (item.Key == "URI")
                {
                    halamanPreview += "<a href=\"" + item.Value.Split('|')[0] + "\" style=\"text-decoration:none;\" class=\"w3-button w3-black w3-hover-white\">" + item.Value.Split('|')[1] + "</a>\n";
                }
                else if (item.Key == "Kutipan Ucapan")
                {
                    halamanPreview += "<div class=\"w3-panel w3-leftbar w3-border-grey w3-light-grey\">\n";
                    halamanPreview += "    <p class=\"w3-large\"><i>\"" + item.Value.Split('|')[0] + "\"</i></p>\n";
                    if (item.Value.Split('|')[1].ToLower() != "n/a")
                    {
                        halamanPreview += "    <footer class=\"w3-container w3-right-align\">\n";
                        halamanPreview += "        <p>" + item.Value.Split('|')[1] + "</p>\n";
                        halamanPreview += "    </footer>\n";
                    }
                    halamanPreview += "</div>\n";
                }
                else if (item.Key == "Kutipan Ayat")
                {
                    halamanPreview += "<div class=\"w3-panel w3-leftbar w3-border-blue w3-light-blue\">\n";
                    halamanPreview += "    <p class=\"w3-large\"><i>\"" + item.Value.Split('|')[0] + "\"</i></p>\n";
                    halamanPreview += "    <footer class=\"w3-container w3-right-align\">\n";
                    halamanPreview += "        <p>" + item.Value.Split('|')[1] + "</p>\n";
                    halamanPreview += "    </footer>\n";
                    halamanPreview += "</div>\n";
                }
                else if (item.Key == "Doa")
                {
                    halamanPreview += "<div class=\"w3-panel w3-topbar w3-bottombar w3-border-blue w3-light-blue\">\n";
                    halamanPreview += "    <h4 class=\"w3-large\"><b>" + item.Value.Split('|')[1] + "</b></h4>\n";
                    halamanPreview += "    <p class=\"w3-large\"><i>\"" + item.Value.Split('|')[0] + "\"</i></p>\n";
                    halamanPreview += "</div>\n";
                }
                else if (item.Key == "Profil Singkat Gereja")
                {
                    // Nomor item array [0] = Nama Gereja
                    // Nomor item array [1] = Alamat
                    // Nomor item array [2] = Gembala Sidang
                    // Nomor item array [3] = Sekretaris
                    // Nomor item array [4] = Bendahara
                    // Nomor item array [5] = Situs Gereja
                    halamanPreview += "<div class=\"w3-card w3-margin-top\">\n";
                    halamanPreview += "    <header class=\"w3-container w3-black\">\n";
                    halamanPreview += "        <h5>" + item.Value.Split('|')[0] + "</h5>\n";
                    halamanPreview += "    </header>\n";
                    halamanPreview += "    <div>\n";
                    halamanPreview += "        <div class=\"w3-row w3-margin\">\n";
                    halamanPreview += "            <div class=\"w3-col m3\">\n";
                    halamanPreview += "                <span>Alamat</span>\n";
                    halamanPreview += "            </div>\n";
                    halamanPreview += "            <div class=\"w3-col m9\">\n";
                    halamanPreview += "                <span>" + item.Value.Split('|')[1] + "</span>\n";
                    halamanPreview += "            </div>\n";
                    halamanPreview += "        </div>\n";
                    halamanPreview += "        <div class=\"w3-row w3-margin\">\n";
                    halamanPreview += "            <div class=\"w3-col m3\">\n";
                    halamanPreview += "                <span>Gembala Sidang</span>\n";
                    halamanPreview += "            </div>\n";
                    halamanPreview += "            <div class=\"w3-col m9\">\n";
                    halamanPreview += "                <span>" + item.Value.Split('|')[2] + "</span>\n";
                    halamanPreview += "            </div>\n";
                    halamanPreview += "        </div>\n";
                    halamanPreview += "        <div class=\"w3-row w3-margin\">\n";
                    halamanPreview += "            <div class=\"w3-col m3\">\n";
                    halamanPreview += "                <span>Sekretaris</span>\n";
                    halamanPreview += "            </div>\n";
                    halamanPreview += "            <div class=\"w3-col m9\">\n";
                    halamanPreview += "                <span>" + item.Value.Split('|')[3] + "</span>\n";
                    halamanPreview += "            </div>\n";
                    halamanPreview += "        </div>\n";
                    halamanPreview += "        <div class=\"w3-row w3-margin\">\n";
                    halamanPreview += "            <div class=\"w3-col m3\">\n";
                    halamanPreview += "                <span>Bendahara</span>\n";
                    halamanPreview += "            </div>\n";
                    halamanPreview += "            <div class=\"w3-col m9\">\n";
                    halamanPreview += "                <span>" + item.Value.Split('|')[4] + "</span>\n";
                    halamanPreview += "            </div>\n";
                    halamanPreview += "        </div>\n";
                    halamanPreview += "        <div class=\"w3-row w3-margin\">\n";
                    halamanPreview += "            <div class=\"w3-col m3\">\n";
                    halamanPreview += "                <span>Situs</span>\n";
                    halamanPreview += "            </div>\n";
                    halamanPreview += "            <div class=\"w3-col m9\">\n";
                    if (item.Value.Split('|')[5] != "[Tidak Tersedia]")
                    {
                        halamanPreview += "                <span><a href=\"" + item.Value.Split('|')[5] + "\" target=\"_blank\">" + item.Value.Split('|')[5] + "</a></span>\n";
                    }
                    else
                    {
                        halamanPreview += "                <span>[Tidak Tersedia]</span>\n";
                    }
                    halamanPreview += "            </div>\n";
                    halamanPreview += "        </div>\n";
                    halamanPreview += "    </div>\n";
                    halamanPreview += "</div>\n";
                }
                else if (item.Key == "Custom")
                {
                    string temp = item.Value.Replace('[', '<');
                    temp = temp.Replace(']', '>');
                    halamanPreview += temp;
                }
            }


            return halamanPreview;
        }
    }
}
