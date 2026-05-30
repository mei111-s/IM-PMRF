// Simple in-memory auth store — persists for the app session
let currentPin = '';

export const authStore = {
  setPin: (pin: string) => { currentPin = pin; },
  getPin: () => currentPin,
};