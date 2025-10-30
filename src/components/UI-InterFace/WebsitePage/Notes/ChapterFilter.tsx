"use client"

import React, { useMemo } from 'react';
import { Select, Divider } from 'antd';

const { Option, OptGroup } = Select;

const sampleSubjects = [
  { id: 's101', name: 'Calculus I', semester: 1 },
  { id: 's102', name: 'Fundamentals of Programming', semester: 1 },
  { id: 's103', name: 'Physics I', semester: 1 },

  { id: 's201', name: 'Calculus II', semester: 2 },
  { id: 's202', name: 'Data Structures', semester: 2 },

  { id: 's301', name: 'Discrete Mathematics', semester: 3 },
  { id: 's302', name: 'Digital Logic', semester: 3 },

  { id: 's401', name: 'Algorithms', semester: 4 },
  { id: 's402', name: 'Database Systems', semester: 4 },

  { id: 's501', name: 'Operating Systems', semester: 5 },
  { id: 's502', name: 'Computer Networks', semester: 5 },

  { id: 's601', name: 'Software Engineering', semester: 6 },
  { id: 's602', name: 'Compiler Design', semester: 6 },

  { id: 's701', name: 'Machine Learning', semester: 7 },
  { id: 's702', name: 'Artificial Intelligence', semester: 7 },

  { id: 's801', name: 'Project', semester: 8 },
  { id: 's802', name: 'Ethics & Law in IT', semester: 8 },
];

const semesterTitle = (n :any) => {
  if (!n) return '';
  const suffix = (n === 1) ? 'st' : (n === 2 ? 'nd' : (n === 3 ? 'rd' : 'th'));
  return `${n}${suffix} Semester`;
};

export default function ChapterFilter({
  value,
  onChange,
  mode = 'single',
  placeholder = 'Select subject(s)...',
  allowClear = true,
  options = sampleSubjects,
  sortBy = 'alpha', // 'alpha' | 'none'  
} : any) {
  // group subjects by semester in a stable order (1..8)
  const grouped = useMemo(() => {
    const map = new Map();
    options.forEach((s :any) => {
      const sem = Number(s.semester) || 0;
      if (!map.has(sem)) map.set(sem, []);
      map.get(sem).push(s);
    });

    // sort semester keys numerically ascending
    const sortedSemesters = Array.from(map.keys()).sort((a, b) => a - b);

    // sort items inside each semester
    const groups = sortedSemesters.map((sem) => {
      const items = map.get(sem) || [];
      if (sortBy === 'alpha') {
        items.sort((a : any, b : any) => a.name.localeCompare(b.name));
      }
      return { semester: sem, items };
    });

    return groups;
  }, [options, sortBy]);

  // custom search: match substring in subject name (case-insensitive)
  const filterOption = (input :any, option :any) => {
    if (!option || !option.children) return false;
    return String(option.children).toLowerCase().includes(String(input).toLowerCase());
  };

  return (
    <div className="subject-select z-999">
      <Select      
        showSearch
        optionFilterProp="children"
        filterOption={filterOption}
        placeholder={placeholder}
        allowClear={allowClear}
        mode={mode === 'multiple' ? 'multiple' : undefined}
        value={value}
        onChange={onChange}        
        dropdownMatchSelectWidth={300}
        showArrow        
        className='!w-full max-w-[500px] !h-12 '
      >
        {grouped.map((g) => (
          <OptGroup key={`sem-${g.semester}`} label={semesterTitle(g.semester)}>
            {g.items.map((s :any) => (
              <Option style={{height: 40}} key={s.id} value={s.id} title={s.name}>
                {s.name}
              </Option>
            ))}
          </OptGroup>
        ))}
      </Select>     
    </div>
  );
}
