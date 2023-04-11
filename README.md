![Screenshot](https://mvc.frengkysinaga.com/Sources/Images/github.png)

# MyPortfolioMVC
A simple website portfolio (well, it's a desktop) based on Windows (technically Windows 11, but somehow it's looking more like Windows 10).

## Used Technologies
1. ASP.NET Core MVC
2. C#
3. JavaScript
4. W3.CSS
5. HTML
6. Line Awesome
7. Google Icons

## Website Capabilities
1. Support multiple languages.
2. Mobile support despite being desktop focused (just like Windows 10+).

## How to Use The `Application` Class to create a new window

Here is an example of how to create a new window using the new class

```JavaScript
var application = new Application(new WindowType().Type.Normal, "Changelog", "pnlWindowNewChangelog");
application.WindowProperties.WindowSize = new WindowSize("600px", "400px");
document.getElementById("pnlDesktopWorkArea").appendChild(application.Render());
```

### What happened there?

```JavaScript
var application = new Application(new WindowType().Type.Normal, "Changelog", "pnlWindowNewChangelog");
```
What this line do is to define a new `Application` object for you to use. Now what each parameter does?
1. `new WindowType().Type.Normal`
   
   This define what type of window you want to create. If you want to create a window without sidebar, replace `.Normal` with `.Single`.

2. `Changelog`

   This part, is for the title of your window. Replace it with your own name.
   
3. `pnlWindowNewChangelog`

   This will be your created window ID. Make sure the ID is unique or it might not work properly.

Next is about this line
```JavaScript
application.WindowProperties.WindowSize = new WindowSize("600px", "400px");
```
What this line do is set the width and height of your window (it takes two parameters and both of them are string objects). If you decide to not use this line, your window will use `500px by 500px` by default.

Now, the last line
```JavaScript
document.getElementById("pnlDesktopWorkArea").appendChild(application.Render());
```
What this does is first call the `application.Render()` method. This method will return `HTMLDivElement`, which you then append to an element that has the ID of `pnlDesktopWorkArea`.

### Access your newly created window
1. When you create a new window, it will generate a ranrom GUID. If you want to use your newly created window, you have to read the GUID of your window.
```JavaScript
var guid = GetGUID(yourWindowId);
```
2. You can put your content now by accessing its ID
- `pnlSidebarContentWindow_yourGuid` to access the sidebar and put your sidebar related content there
- `pnlContentWindow_yourGuid` to access the main content

### Additional things you can do 
#### Disable the minimize, maximize, or close
When you create a new window, before calling the Render() set the value to `false` to the button you want to disable (Minimize, Maximize, or Close)
```JavaScript
application.WindowProperties.WindowControlsOption.EnableMinimize = false; // Disable the minimize button

```

### Something you need to know
1. This application uses `crypto.randomUUID()` function to generate a unique GUID for each created window. And from what I read on MDN, this function can only be used in a secure environment (HTTPS) or on localhost, so...

2. ~~The are some limitations about this project. For now, the new windows (and the older windows) cannot be dragged. I still need to find a solution to safely implement this feature.~~

3. Also for now, all the windows can only be maximized (or restored) and are not resizeable. This is a limitation on my end.

4. I found a bug where the window might not be positioned properly if you have a display that is scalled...

---
That's what I can think right now...
