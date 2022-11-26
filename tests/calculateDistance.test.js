// This file tests the function calculateDistanceInMiles in the file 'Home.jsx'
// Expected outputs and actual outputs are compared after being adjusted to two significant figures

// setup, mock date and import calculate distance function
jest.mock("dateformat", () => jest.fn());
const calculateDistanceInMiles = require('../frontend/src/components/Home.jsx').calculateDistanceInMiles;


// begin tests

// Equivalence class: +, -, 0
test('Testing input (0, 0, 0, 0) equals 0', () => {
    console.log("distance: ", calculateDistanceInMiles(0,0,0,0));
    expect(calculateDistanceInMiles(0,0,0,0).toPrecision(2)).toBe((0).toPrecision(2))
});

test('Testing input (0, 0, 75, -10) equals 5190.3', () => {
    expect(calculateDistanceInMiles(0,0,75,-10).toPrecision(2)).toBe((5190.3).toPrecision(2))
});

test('Testing input (-80, 170, 0, 0) equals 6898.2', () => {
    expect(calculateDistanceInMiles(-80, 170, 0, 0).toPrecision(2)).toBe((6898.2).toPrecision(2))
});

test('Testing input (-45, -135, -30, -100) equals 2160.1', () => {
    expect(calculateDistanceInMiles(-45, -135, -30, -100).toPrecision(2)).toBe((2160.1).toPrecision(2))
});

test('Testing input (60, 0, 29, -75) equals 3999.6', () => {
    expect(calculateDistanceInMiles(60, 0, 29, -75).toPrecision(2)).toBe((3999.6).toPrecision(2))
});

// Equivalence class: edges
test('Testing input (-90, 180, 90, -180) equals 12429.7', () => {
    expect(calculateDistanceInMiles(-90, 180, 90, -180).toPrecision(2)).toBe((12429.7).toPrecision(2))
});

test('Testing input (-90, -180, 90, -180) equals 12429.7', () => {
    expect(calculateDistanceInMiles(-90, -180, 90, -180).toPrecision(2)).toBe((12429.7).toPrecision(2))
});

// Equivalence class: decimals
test('Testing input (-30.550399934, 80.3399599, 89.000388552,  18.0038845) equals 8283.3', () => {
    expect(calculateDistanceInMiles(-30.550399934, 80.3399599, 89.000388552,  18.0038845).toPrecision(2)).toBe((8283.3).toPrecision(2))
});

test('Testing input (55.320870823570, 14.999399300, -18.2993955, 170.99399999) equals 9584.1', () => {
    expect(calculateDistanceInMiles(55.320870823570, 14.999399300, -18.2993955, 170.99399999).toPrecision(2)).toBe((9584.1).toPrecision(2))
});

// Equivalence class: close
test('Testing input (32.9299175559866, -117.09412823562863, 32.939298140655715, -117.03337138806742) equals 3.59', () => {
    expect(calculateDistanceInMiles(32.9299175559866, -117.09412823562863, 32.939298140655715, -117.03337138806742).toPrecision(2)).toBe((3.59).toPrecision(2))
});
