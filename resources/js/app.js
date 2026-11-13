// The admin's only Alpine bootstrap. Register new modules in ui/register.js;
// never call Alpine.start() anywhere else. The public landing page is a
// separate React entry (resources/js/landing/main.tsx).
import Alpine from 'alpinejs';

import { registerUi } from './ui/register.js';

registerUi(Alpine);

window.Alpine = Alpine;

Alpine.start();
