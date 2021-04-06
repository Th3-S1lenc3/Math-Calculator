# Math-Calculator

Math-Calculator is a calculator for math operations created with Node.js, Electron & React.

*( Jump to: [Technologies](#technologies) - [Installation & Usage](#installation--usage) - [License](#license) )*

The calculations this program can perform are:

 - Matrix operations
 - Solving systems of linear equations
 - Calculating the series of a subset of the Fibonacci Sequence
 - Probability of rolling r on n, s-sided die
 - Recursive sorting of digits
 - Vector transformation & rotation
 - Calculating the minimum number of hops between two nodes in an adjacency graph

If you experience a problem, search through the [Issues](https://github.com/Th3-S1lenc3/Math-Calculator/issues) to see if yours has already been reported. If you're confident it hasn't been reported yet, feel free to open up a new one. If you see your issue and it's been closed, it probably means that the fix for it will ship in the next version, and you'll have to wait a bit.

# Technologies
[Back to top](#math-calculator)

Project is created with:

 - @fortawesome/fontawesome-svg-core: 1.2.35
 - @fortawesome/free-solid-svg-icons: 5.15.3
 - @fortawesome/react-fontawesome: 0.1.14
 - better-react-mathjax: 1.0.1
 - bootstrap: 4.6.0
 - electron: 12.0.2
 - fraction.js: 4.0.13
 - jquery: 3.6.0
 - jsxgraph-react-js: 1.0.4
 - react: 17.0.2
 - react-bootstrap: 1.5.2
 - react-flow-renderer: 9.4.4

# Installation & Usage
[Back to top](#math-calculator)

### Option 1: Download a prebuilt binary

Go to the [Releases](https://github.com/Th3-S1lenc3/Math-Calculator/releases) page and download the release for your operating system.

On Linux, you will need to `chmod +x` the AppImage file in order to run it.

#### Optional:
Verify your download by generating a SHA256 sum of the downloaded file and then check that matches the sum for your file on the releases page.

On *nix systems:
```
$ sha256sum <path_to_downloaded_file>
```
Example:
```
$ sha256sum math-calculator_2.0.0_amd64_linux.AppImage
```

On Windows:
```
Powershell
$ Get-FileHash -Path <path_to_downloaded_file>

Command Prompt
$ certutil -hashfile <path_to_downloaded_file> sha256
```
Example:
```
Powershell
$ Get-FileHash -Path math-calculator_2.0.0_amd64_windows_portable.exe

Command Prompt
$ certutil -hashfile math-calculator_2.0.0_amd64_windows_portable.exe sha256
```

### Option 2 : Clone from repository
**IMPORTANT NOTE:** downloading the latest release will download the latest unreleased, development version and may not be stable.

Download Latest:
```
$ git clone https://github.com/Th3-S1lenc3/Math-Calculator.git
$ cd Math-Calculator
$ npm install
$ npm run electron-dev
```
Download from tag:
```
$ git clone --depth 1 --branch <tag_name> https://github.com/Th3-S1lenc3/Math-Calculator.git
$ cd Math-Calculator
$ npm install
For <tag_name> >= v2.0.0
$ npm run electron-dev
For <tag_name> < v2.0.0
$ npm start
```

# License
[Back to top](#math-calculator)

This project is licensed under the MIT License - see [LICENSE](LICENSE) for details
