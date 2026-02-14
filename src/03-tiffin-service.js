/**
 * 🍱 Mumbai Tiffin Service - Plan Builder
 *
 * Mumbai ki famous tiffin delivery service hai. Customer ka plan banana hai
 * using destructuring parameters aur rest/spread operators.
 *
 * Functions:
 *
 *   1. createTiffinPlan({ name, mealType = "veg", days = 30 })
 *      - Destructured parameter with defaults!
 *      - Meal prices per day: veg=80, nonveg=120, jain=90
 *      - Agar mealType unknown hai, return null
 *      - Agar name missing/empty, return null
 *      - Return: { name, mealType, days, dailyRate, totalCost }
 *
 *   2. combinePlans(...plans)
 *      - Rest parameter! Takes any number of plan objects
 *      - Each plan: { name, mealType, days, dailyRate, totalCost }
 *      - Return: { totalCustomers, totalRevenue, mealBreakdown }
 *      - mealBreakdown: { veg: count, nonveg: count, ... }
 *      - Agar koi plans nahi diye, return null
 *
 *   3. applyAddons(plan, ...addons)
 *      - plan: { name, mealType, days, dailyRate, totalCost }
 *      - Each addon: { name: "raita", price: 15 }
 *      - Add each addon price to dailyRate
 *      - Recalculate totalCost = new dailyRate * days
 *      - Return NEW plan object (don't modify original)
 *      - addonNames: array of addon names added
 *      - Agar plan null hai, return null
 *
 * Hint: Use { destructuring } in params, ...rest for variable args,
 *   spread operator for creating new objects
 *
 * @example
 *   createTiffinPlan({ name: "Rahul" })
 *   // => { name: "Rahul", mealType: "veg", days: 30, dailyRate: 80, totalCost: 2400 }
 *
 *   combinePlans(plan1, plan2, plan3)
 *   // => { totalCustomers: 3, totalRevenue: 7200, mealBreakdown: { veg: 2, nonveg: 1 } }
 */
export function createTiffinPlan({ name, mealType = "veg", days = 30 } = {}) {
  // Your code here
  if(mealType==undefined) return null;
  if(!name || typeof name!=="string") return null;
  const itemprice={
    "veg":80, "nonveg":120, "jain":90
  }
  if(!itemprice[mealType]) return null;
  let rate=itemprice[mealType]
   return {
    name:name,
    mealType,
    days,
    dailyRate:rate,
    totalCost:rate*days
   }
}

export function combinePlans(...plans) {
  // Your code here
  if(plans.length==0) return null;
  let totalcustomers=plans.length;
 const totalRevenue = plans.reduce(
    (sum, plan) => sum + plan.totalCost,
    0
  );
  let mealBreakDown={
    veg:0,
    nonveg:0
  }
      plans.forEach(plan => {
   mealBreakDown[plan.mealType] = 
      (mealBreakDown[plan.mealType] ?? 0) + 1;
});

  return {
    totalCustomers: totalcustomers,
    totalRevenue: totalRevenue,
    mealBreakdown: mealBreakDown
  };
}

export function applyAddons(plan, ...addons) {
  // Your code here
if (plan == null) return null;

  
  const newPlan = { ...plan };

 
  let extraPerDay = 0;
  const addonNames = [];

  for (const addon of addons) {
    if (!addon || typeof addon.price !== "number") continue;

    extraPerDay += addon.price;
    addonNames.push(addon.name);
  }

 
  newPlan.dailyRate = newPlan.dailyRate + extraPerDay;
  newPlan.totalCost = newPlan.dailyRate * newPlan.days;
  newPlan.addonNames = addonNames;

  return newPlan;
}
