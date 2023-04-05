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

1. Define a new `Application` object like this

```JavaScript
var application = new Application(new WindowType().Type.Normal, "Your window name", "yourWindowId");
```
if you want to create a new window with sidebar. If you want to create a new window without the sidebar, replace `Normal` with `Single`.

2. Adjust the window resolution. By default, when you create a new `Application` object, it will set the resolution to `500x500`. To change the resolution, do it like this
```JavaScript
application.WindowProperties.WindowSize = new WindowSize("800px", "600px");
```
3. You are now ready. To use the new window, just call the `application.Render()`

### Use the newly created window
1. When you create a new window, it will generate a ranrom GUID. You need to need to read the GUID
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
---
That's what I can think right now...
