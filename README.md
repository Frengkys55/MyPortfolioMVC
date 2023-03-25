![Screenshot](https://mvc.frengkysinaga.com/Sources/Images/github.png)

# MyPortfolioMVC
A simple website portfolio (well, it's a desktop).

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

That's what I can think right now...
