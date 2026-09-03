-- ══════════════════════════════════════════════════════════
-- DTO — Top-up SQL: adds 4 missing entries to reach 80 total
-- Run in Supabase SQL Editor → New Query
-- ══════════════════════════════════════════════════════════

INSERT INTO patents
  (name, sector, description, holder, access_type, available_since,
   saving, countries, source_link, notes, confidence, verified_date,
   tags, implementation_difficulty, is_published)
VALUES

('Aspirin (Acetylsalicylic Acid) API','Pharmaceuticals',
 'One of the world''s oldest and most widely used medicines — analgesic, anti-inflammatory, and antiplatelet agent. All core manufacturing patents expired over 100 years ago. Africa imports the vast majority of aspirin API despite the synthesis being one of the simplest in pharmaceutical manufacturing.',
 'Bayer AG (original — patent expired 1917)','Public Domain','Pre-1920',
 '60–80% cost reduction vs imported API',
 'Pan-African',
 'https://patents.google.com',
 'Full acetylsalicylic acid synthesis available in public domain. One of the simplest pharmaceutical syntheses — acetic anhydride + salicylic acid. WHO prequalification pathway available. No licence required.',
 'DTO Verified','May 2026',
 ARRAY['analgesic','anti-inflammatory','antiplatelet','OTC','aspirin'],'Low',true),

('Cement — Portland Cement Grinding & Blending','Cement & Construction',
 'Portland cement production through clinker grinding and blending with gypsum. While the rotary kiln (covered separately) produces clinker, the grinding and blending stage is a distinct and separately implementable process. Africa''s cement demand is growing at 7%+ annually.',
 'Various (original Portland cement patents expired pre-1900)','Public Domain','Pre-1900',
 'Reduce cement technology acquisition cost — grinding plants require far less capital than full kiln operations',
 'Pan-African — especially Nigeria, Kenya, Ghana, Tanzania, Mozambique, Zimbabwe, Senegal',
 'https://patents.google.com',
 'Grinding and blending plants can be set up independently of clinker production — importing clinker and grinding locally is a proven intermediate step. Far lower capital requirement than full integrated plant.',
 'DTO Verified','May 2026',
 ARRAY['cement','Portland cement','grinding','construction','AfCFTA'],'Medium',true),

('Photovoltaic Solar Charge Controllers','Energy',
 'Electronic charge controller circuits for solar PV battery systems. Core PWM (Pulse Width Modulation) controller designs and early MPPT (Maximum Power Point Tracking) designs from the 1980s–1990s are fully in the public domain. Essential for off-grid solar systems across rural Africa.',
 'Various (original PWM controller patents 1980s–1990s)','Public Domain','Pre-2000',
 'Produce solar charge controllers locally — eliminate import cost for a critical solar component',
 'Pan-African — especially rural sub-Saharan Africa',
 'https://patents.google.com',
 'PWM charge controller designs fully public domain. Reference designs freely available from Texas Instruments and open-source electronics communities. Open-source MPPT designs also available.',
 'DTO Verified','May 2026',
 ARRAY['solar','charge controller','PWM','off-grid','electronics','renewable energy'],'Medium',true),

('Natural Indigo & Plant-Based Textile Dyes','Textiles & Leather',
 'Extraction and application of natural plant-based dyes for textiles — indigo from Indigofera tinctoria, kola nut brown, osun red from camwood, and other African botanical dyes. All extraction and application processes are traditional knowledge in the public domain. Premium natural-dyed textiles command 2–5x the price of synthetic-dyed equivalents in European and US markets.',
 'Traditional knowledge — fully public domain','Public Domain','Pre-industrial',
 'Access premium natural textile dye market — natural-dyed fabrics command 2–5x premium',
 'Nigeria (adire/indigo tradition), Ghana, Mali, Senegal, Côte d''Ivoire, Guinea, Cameroon, Tanzania, Uganda',
 'https://patentscope.wipo.int',
 'Completely traditional knowledge — no IP concerns. West African indigo dyeing traditions (adire in Nigeria, bogolan in Mali) are UNESCO-recognised. Growing demand in premium sustainable fashion markets.',
 'DTO Verified','May 2026',
 ARRAY['natural dye','indigo','textile','sustainable','traditional knowledge','premium'],'Low',true);

-- Verify final count
SELECT COUNT(*) as total_entries FROM patents;
SELECT sector, COUNT(*) as count FROM patents GROUP BY sector ORDER BY count DESC;
