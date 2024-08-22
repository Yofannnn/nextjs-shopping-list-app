export function setColorTheme(color: string, theme?: string) {
  if (!theme) theme = "dark";
  if (color === "green") setPropertyGreen(theme);
  if (color === "orange") setPropertyOrange(theme);
  if (color === "yellow") setPropertyYellow(theme);
  if (color === "violet") setPropertyViolet(theme);
  if (color === "blue") setPropertyBlue(theme);
  if (color === "default") setPropertyDefault(theme);
}

function setPropertyGreen(theme: string) {
  const root = document.documentElement;
  if (theme === "light") {
    root.style.setProperty("--background", "0 0% 100%");
    root.style.setProperty("--foreground", "240 10% 3.9%");
    root.style.setProperty("--card", "0 0% 100%");
    root.style.setProperty("--card-foreground", "240 10% 3.9%");
    root.style.setProperty("--popover", "0 0% 100%");
    root.style.setProperty("--popover-foreground", "240 10% 3.9%");
    root.style.setProperty("--primary", "142.1 76.2% 36.3%");
    root.style.setProperty("--primary-foreground", "355.7 100% 97.3%");
    root.style.setProperty("--secondary", "240 4.8% 95.9%");
    root.style.setProperty("--secondary-foreground", "240 5.9% 10%");
    root.style.setProperty("--muted", "240 4.8% 95.9%");
    root.style.setProperty("--muted-foreground", "240 3.8% 46.1%");
    root.style.setProperty("--accent", "240 4.8% 95.9%");
    root.style.setProperty("--accent-foreground", "240 5.9% 10%");
    root.style.setProperty("--destructive", "0 84.2% 60.2%");
    root.style.setProperty("--destructive-foreground", "0 0% 98%");
    root.style.setProperty("--border", "240 5.9% 90%");
    root.style.setProperty("--input", "240 5.9% 90%");
    root.style.setProperty("--ring", "142.1 76.2% 36.3%");
    root.style.setProperty("--radius", "0.5rem");
    root.style.setProperty("--chart-1", "12 76% 61%");
    root.style.setProperty("--chart-2", "173 58% 39%");
    root.style.setProperty("--chart-3", "197 37% 24%");
    root.style.setProperty("--chart-4", "43 74% 66%");
    root.style.setProperty("--chart-5", "27 87% 67%");
  } else {
    root.style.setProperty("--background", "20 14.3% 4.1%");
    root.style.setProperty("--foreground", "0 0% 95%");
    root.style.setProperty("--card", "24 9.8% 10%");
    root.style.setProperty("--card-foreground", "0 0% 95%");
    root.style.setProperty("--popover", "0 0% 9%");
    root.style.setProperty("--popover-foreground", "0 0% 95%");
    root.style.setProperty("--primary", "142.1 70.6% 45.3%");
    root.style.setProperty("--primary-foreground", "144.9 80.4% 10%");
    root.style.setProperty("--secondary", "240 3.7% 15.9%");
    root.style.setProperty("--secondary-foreground", "0 0% 98%");
    root.style.setProperty("--muted", "0 0% 15%");
    root.style.setProperty("--muted-foreground", "240 5% 64.9%");
    root.style.setProperty("--accent", "12 6.5% 15.1%");
    root.style.setProperty("--accent-foreground", "0 0% 98%");
    root.style.setProperty("--destructive", "0 62.8% 30.6%");
    root.style.setProperty("--destructive-foreground", "0 85.7% 97.3%");
    root.style.setProperty("--border", "240 3.7% 15.9%");
    root.style.setProperty("--input", "240 3.7% 15.9%");
    root.style.setProperty("--ring", "142.4 71.8% 29.2%");
    root.style.setProperty("--chart-1", "220 70% 50%");
    root.style.setProperty("--chart-2", "160 60% 45%");
    root.style.setProperty("--chart-3", "30 80% 55%");
    root.style.setProperty("--chart-4", "280 65% 60%");
    root.style.setProperty("--chart-5", "340 75% 55%");
  }
}

function setPropertyOrange(theme: string) {
  const root = document.documentElement;
  if (theme === "light") {
    root.style.setProperty("--background", "0 0% 100%");
    root.style.setProperty("--foreground", "20 14.3% 4.1%");
    root.style.setProperty("--card", "0 0% 100%");
    root.style.setProperty("--card-foreground", "20 14.3% 4.1%");
    root.style.setProperty("--primary", "24.6 95% 53.1%");
    root.style.setProperty("--primary-foreground", "60 9.1% 97.8%");
    root.style.setProperty("--secondary", "60 4.8% 95.9%");
    root.style.setProperty("--secondary-foreground", "24 9.8% 10%");
    root.style.setProperty("--muted", "60 4.8% 95.9%");
    root.style.setProperty("--muted-foreground", "25 5.3% 44.7%");
    root.style.setProperty("--accent", "60 4.8% 95.9%");
    root.style.setProperty("--accent-foreground", "24 9.8% 10%");
    root.style.setProperty("--destructive", "0 84.2% 60.2%");
    root.style.setProperty("--destructive-foreground", "60 9.1% 97.8%");
    root.style.setProperty("--border", "20 5.9% 90%");
    root.style.setProperty("--input", "20 5.9% 90%");
    root.style.setProperty("--ring", "24.6 95% 53.1%");
    root.style.setProperty("--radius", "0.5rem");
    root.style.setProperty("--chart-1", "12 76% 61%");
    root.style.setProperty("--chart-2", "173 58% 39%");
    root.style.setProperty("--chart-3", "197 37% 24%");
    root.style.setProperty("--chart-4", "43 74% 66%");
    root.style.setProperty("--chart-5", "27 87% 67%");
  } else {
    root.style.setProperty("--background", "20 14.3% 4.1%");
    root.style.setProperty("--foreground", "60 9.1% 97.8%");
    root.style.setProperty("--card", "20 14.3% 4.1%");
    root.style.setProperty("--card-foreground", "60 9.1% 97.8%");
    root.style.setProperty("--primary", "20.5 90.2% 48.2%");
    root.style.setProperty("--primary-foreground", "60 9.1% 97.8%");
    root.style.setProperty("--secondary", "12 6.5% 15.1%");
    root.style.setProperty("--secondary-foreground", "60 9.1% 97.8%");
    root.style.setProperty("--muted", "12 6.5% 15.1%");
    root.style.setProperty("--muted-foreground", "24 5.4% 63.9%");
    root.style.setProperty("--accent", "12 6.5% 15.1%");
    root.style.setProperty("--accent-foreground", "60 9.1% 97.8%");
    root.style.setProperty("--destructive", "0 72.2% 50.6%");
    root.style.setProperty("--destructive-foreground", "60 9.1% 97.8%");
    root.style.setProperty("--border", "12 6.5% 15.1%");
    root.style.setProperty("--input", "12 6.5% 15.1%");
    root.style.setProperty("--ring", "20.5 90.2% 48.2%");
    root.style.setProperty("--chart-1", "220 70% 50%");
    root.style.setProperty("--chart-2", "160 60% 45%");
    root.style.setProperty("--chart-3", "30 80% 55%");
    root.style.setProperty("--chart-4", "280 65% 60%");
    root.style.setProperty("--chart-5", "340 75% 55%");
  }
}

function setPropertyYellow(theme: string) {
  const root = document.documentElement;
  if (theme === "light") {
    root.style.setProperty("--background", "0 0% 100%");
    root.style.setProperty("--foreground", "20 14.3% 4.1%");
    root.style.setProperty("--card", "0 0% 100%");
    root.style.setProperty("--card-foreground", "20 14.3% 4.1%");
    root.style.setProperty("--popover", "0 0% 100%");
    root.style.setProperty("--popover-foreground", "20 14.3% 4.1%");
    root.style.setProperty("--primary", "47.9 95.8% 53.1%");
    root.style.setProperty("--primary-foreground", "26 83.3% 14.1%");
    root.style.setProperty("--secondary", "60 4.8% 95.9%");
    root.style.setProperty("--secondary-foreground", "24 9.8% 10%");
    root.style.setProperty("--muted", "60 4.8% 95.9%");
    root.style.setProperty("--muted-foreground", "25 5.3% 44.7%");
    root.style.setProperty("--accent", "60 4.8% 95.9%");
    root.style.setProperty("--accent-foreground", "24 9.8% 10%");
    root.style.setProperty("--destructive", "0 84.2% 60.2%");
    root.style.setProperty("--destructive-foreground", "60 9.1% 97.8%");
    root.style.setProperty("--border", "20 5.9% 90%");
    root.style.setProperty("--input", "20 5.9% 90%");
    root.style.setProperty("--ring", "20 14.3% 4.1%");
    root.style.setProperty("--radius", "0.5rem");
    root.style.setProperty("--chart-1", "12 76% 61%");
    root.style.setProperty("--chart-2", "173 58% 39%");
    root.style.setProperty("--chart-3", "197 37% 24%");
    root.style.setProperty("--chart-4", "43 74% 66%");
    root.style.setProperty("--chart-5", "27 87% 67%");
  } else {
    root.style.setProperty("--background", "20 14.3% 4.1%");
    root.style.setProperty("--foreground", "60 9.1% 97.8%");
    root.style.setProperty("--card", "20 14.3% 4.1%");
    root.style.setProperty("--card-foreground", "60 9.1% 97.8%");
    root.style.setProperty("--popover", "20 14.3% 4.1%");
    root.style.setProperty("--popover-foreground", "60 9.1% 97.8%");
    root.style.setProperty("--primary", "47.9 95.8% 53.1%");
    root.style.setProperty("--primary-foreground", "26 83.3% 14.1%");
    root.style.setProperty("--secondary", "12 6.5% 15.1%");
    root.style.setProperty("--secondary-foreground", "60 9.1% 97.8%");
    root.style.setProperty("--muted", "12 6.5% 15.1%");
    root.style.setProperty("--muted-foreground", "24 5.4% 63.9%");
    root.style.setProperty("--accent", "12 6.5% 15.1%");
    root.style.setProperty("--accent-foreground", "60 9.1% 97.8%");
    root.style.setProperty("--destructive", "0 62.8% 30.6%");
    root.style.setProperty("--destructive-foreground", "60 9.1% 97.8%");
    root.style.setProperty("--border", "12 6.5% 15.1%");
    root.style.setProperty("--input", "12 6.5% 15.1%");
    root.style.setProperty("--ring", "35.5 91.7% 32.9%");
    root.style.setProperty("--chart-1", "220 70% 50%");
    root.style.setProperty("--chart-2", "160 60% 45%");
    root.style.setProperty("--chart-3", "30 80% 55%");
    root.style.setProperty("--chart-4", "280 65% 60%");
    root.style.setProperty("--chart-5", "340 75% 55%");
  }
}
function setPropertyViolet(theme: string) {
  const root = document.documentElement;
  if (theme === "light") {
    root.style.setProperty("--background", "0 0% 100%");
    root.style.setProperty("--foreground", "224 71.4% 4.1%");
    root.style.setProperty("--card", "0 0% 100%");
    root.style.setProperty("--card-foreground", "224 71.4% 4.1%");
    root.style.setProperty("--popover", "0 0% 100%");
    root.style.setProperty("--popover-foreground", "224 71.4% 4.1%");
    root.style.setProperty("--primary", "262.1 83.3% 57.8%");
    root.style.setProperty("--primary-foreground", "210 20% 98%");
    root.style.setProperty("--secondary", "220 14.3% 95.9%");
    root.style.setProperty("--secondary-foreground", "220.9 39.3% 11%");
    root.style.setProperty("--muted", "220 14.3% 95.9%");
    root.style.setProperty("--muted-foreground", "220 8.9% 46.1%");
    root.style.setProperty("--accent", "220 14.3% 95.9%");
    root.style.setProperty("--accent-foreground", "220.9 39.3% 11%");
    root.style.setProperty("--destructive", "0 84.2% 60.2%");
    root.style.setProperty("--destructive-foreground", "210 20% 98%");
    root.style.setProperty("--border", "220 13% 91%");
    root.style.setProperty("--input", "220 13% 91%");
    root.style.setProperty("--ring", "262.1 83.3% 57.8%");
    root.style.setProperty("--radius", "0.5rem");
    root.style.setProperty("--chart-1", "12 76% 61%");
    root.style.setProperty("--chart-2", "173 58% 39%");
    root.style.setProperty("--chart-3", "197 37% 24%");
    root.style.setProperty("--chart-4", "43 74% 66%");
    root.style.setProperty("--chart-5", "27 87% 67%");
  } else {
    root.style.setProperty("--background", "224 71.4% 4.1%");
    root.style.setProperty("--foreground", "210 20% 98%");
    root.style.setProperty("--card", "224 71.4% 4.1%");
    root.style.setProperty("--card-foreground", "210 20% 98%");
    root.style.setProperty("--popover", "224 71.4% 4.1%");
    root.style.setProperty("--popover-foreground", "210 20% 98%");
    root.style.setProperty("--primary", "263.4 70% 50.4%");
    root.style.setProperty("--primary-foreground", "210 20% 98%");
    root.style.setProperty("--secondary", "215 27.9% 16.9%");
    root.style.setProperty("--secondary-foreground", "210 20% 98%");
    root.style.setProperty("--muted", "215 27.9% 16.9%");
    root.style.setProperty("--muted-foreground", "217.9 10.6% 64.9%");
    root.style.setProperty("--accent", "215 27.9% 16.9%");
    root.style.setProperty("--accent-foreground", "210 20% 98%");
    root.style.setProperty("--destructive", "0 62.8% 30.6%");
    root.style.setProperty("--destructive-foreground", "210 20% 98%");
    root.style.setProperty("--border", "215 27.9% 16.9%");
    root.style.setProperty("--input", "215 27.9% 16.9%");
    root.style.setProperty("--ring", "263.4 70% 50.4%");
    root.style.setProperty("--chart-1", "220 70% 50%");
    root.style.setProperty("--chart-2", "160 60% 45%");
    root.style.setProperty("--chart-3", "30 80% 55%");
    root.style.setProperty("--chart-4", "280 65% 60%");
    root.style.setProperty("--chart-5", "340 75% 55%");
  }
}
function setPropertyBlue(theme: string) {
  const root = document.documentElement;
  if (theme === "light") {
    root.style.setProperty("--background", "0 0% 100%");
    root.style.setProperty("--foreground", "222.2 84% 4.9%");
    root.style.setProperty("--card", "0 0% 100%");
    root.style.setProperty("--card-foreground", "222.2 84% 4.9%");
    root.style.setProperty("--popover", "0 0% 100%");
    root.style.setProperty("--popover-foreground", "222.2 84% 4.9%");
    root.style.setProperty("--primary", "221.2 83.2% 53.3%");
    root.style.setProperty("--primary-foreground", "210 40% 98%");
    root.style.setProperty("--secondary", "210 40% 96.1%");
    root.style.setProperty("--secondary-foreground", "222.2 47.4% 11.2%");
    root.style.setProperty("--muted", "210 40% 96.1%");
    root.style.setProperty("--muted-foreground", "215.4 16.3% 46.9%");
    root.style.setProperty("--accent", "210 40% 96.1%");
    root.style.setProperty("--accent-foreground", "222.2 47.4% 11.2%");
    root.style.setProperty("--destructive", "0 84.2% 60.2%");
    root.style.setProperty("--destructive-foreground", "210 40% 98%");
    root.style.setProperty("--border", "214.3 31.8% 91.4%");
    root.style.setProperty("--input", "214.3 31.8% 91.4%");
    root.style.setProperty("--ring", "221.2 83.2% 53.3%");
    root.style.setProperty("--radius", "0.5rem");
    root.style.setProperty("--chart-1", "12 76% 61%");
    root.style.setProperty("--chart-2", "173 58% 39%");
    root.style.setProperty("--chart-3", "197 37% 24%");
    root.style.setProperty("--chart-4", "43 74% 66%");
    root.style.setProperty("--chart-5", "27 87% 67%");
  } else {
    root.style.setProperty("--background", "222.2 84% 4.9%");
    root.style.setProperty("--foreground", "210 40% 98%");
    root.style.setProperty("--card", "222.2 84% 4.9%");
    root.style.setProperty("--card-foreground", "210 40% 98%");
    root.style.setProperty("--popover", "222.2 84% 4.9%");
    root.style.setProperty("--popover-foreground", "210 40% 98%");
    root.style.setProperty("--primary", "217.2 91.2% 59.8%");
    root.style.setProperty("--primary-foreground", "222.2 47.4% 11.2%");
    root.style.setProperty("--secondary", "217.2 32.6% 17.5%");
    root.style.setProperty("--secondary-foreground", "210 40% 98%");
    root.style.setProperty("--muted", "217.2 32.6% 17.5%");
    root.style.setProperty("--muted-foreground", "215 20.2% 65.1%");
    root.style.setProperty("--accent", "217.2 32.6% 17.5%");
    root.style.setProperty("--accent-foreground", "210 40% 98%");
    root.style.setProperty("--destructive", "0 62.8% 30.6%");
    root.style.setProperty("--destructive-foreground", "210 40% 98%");
    root.style.setProperty("--border", "217.2 32.6% 17.5%");
    root.style.setProperty("--input", "217.2 32.6% 17.5%");
    root.style.setProperty("--ring", "224.3 76.3% 48%");
    root.style.setProperty("--chart-1", "220 70% 50%");
    root.style.setProperty("--chart-2", "160 60% 45%");
    root.style.setProperty("--chart-3", "30 80% 55%");
    root.style.setProperty("--chart-4", "280 65% 60%");
    root.style.setProperty("--chart-5", "340 75% 55%");
  }
}

function setPropertyDefault(theme: string) {
  const root = document.documentElement;

  if (theme === "light") {
    root.style.setProperty("--background", "0 0% 100%");
    root.style.setProperty("--foreground", "0 0% 3.9%");
    root.style.setProperty("--card", "0 0% 100%");
    root.style.setProperty("--card-foreground", "0 0% 3.9%");
    root.style.setProperty("--popover", "0 0% 100%");
    root.style.setProperty("--popover-foreground", "0 0% 3.9%");
    root.style.setProperty("--primary", "0 0% 9%");
    root.style.setProperty("--primary-foreground", "0 0% 98%");
    root.style.setProperty("--secondary", "0 0% 96.1%");
    root.style.setProperty("--secondary-foreground", "0 0% 9%");
    root.style.setProperty("--muted", "0 0% 96.1%");
    root.style.setProperty("--muted-foreground", "0 0% 45.1%");
    root.style.setProperty("--accent", "0 0% 96.1%");
    root.style.setProperty("--accent-foreground", "0 0% 9%");
    root.style.setProperty("--destructive", "0 84.2% 60.2%");
    root.style.setProperty("--destructive-foreground", "0 0% 98%");
    root.style.setProperty("--border", "0 0% 89.8%");
    root.style.setProperty("--input", "0 0% 89.8%");
    root.style.setProperty("--ring", "0 0% 3.9%");
    root.style.setProperty("--radius", "0.5rem");
  } else {
    root.style.setProperty("--background", "0 0% 3.9%");
    root.style.setProperty("--foreground", "0 0% 98%");
    root.style.setProperty("--card", "0 0% 3.9%");
    root.style.setProperty("--card-foreground", "0 0% 98%");
    root.style.setProperty("--popover", "0 0% 3.9%");
    root.style.setProperty("--popover-foreground", "0 0% 98%");
    root.style.setProperty("--primary", "0 0% 98%");
    root.style.setProperty("--primary-foreground", "0 0% 9%");
    root.style.setProperty("--secondary", "0 0% 14.9%");
    root.style.setProperty("--secondary-foreground", "0 0% 98%");
    root.style.setProperty("--muted", "0 0% 14.9%");
    root.style.setProperty("--muted-foreground", "0 0% 63.9%");
    root.style.setProperty("--accent", "0 0% 14.9%");
    root.style.setProperty("--accent-foreground", "0 0% 98%");
    root.style.setProperty("--destructive", "0 62.8% 30.6%");
    root.style.setProperty("--destructive-foreground", "0 0% 98%");
    root.style.setProperty("--border", "0 0% 14.9%");
    root.style.setProperty("--input", "0 0% 14.9%");
    root.style.setProperty("--ring", "0 0% 83.1%");
  }
}
