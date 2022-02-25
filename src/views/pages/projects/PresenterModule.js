// ** React Imports
import { Fragment, useState, forwardRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

// ** Table Data & Columns
// import { data, columns } from '../data'

// ** Add New Modal Component
// import AddNewModal from './AddNewModal'

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { ChevronDown, Share, Printer, FileText, File, Grid, Copy, Plus, MoreVertical, Edit, Archive, Trash, X } from 'react-feather'
import { useForm, Controller } from 'react-hook-form'
import Select, { components } from 'react-select'
import { selectThemeColors } from '@utils'

import {
  Card,
  CardHeader,
  CardTitle,
  Button, 
  UncontrolledDropdown, 
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
  Label,
  Row,
  Col, 
  Badge,
  Modal, 
  ModalBody, 
  ModalHeader, 
  ModalFooter,
  Form, 
  FormGroup, 
  CustomInput
} from 'reactstrap'

import Avatar from '@components/avatar'
import Flatpickr from 'react-flatpickr'

import '@styles/react/libs/flatpickr/flatpickr.scss'
import Uppy from '@uppy/core'
import { DragDrop } from '@uppy/react'
import thumbnailGenerator from '@uppy/thumbnail-generator'

import AddNewPresenterModal from './modal/AddNewPresenterModal'
import EditPresenterModal from './modal/EditPresenterModal'

import 'uppy/dist/uppy.css'
import '@uppy/status-bar/dist/style.css'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

// ** Bootstrap Checkbox Component
// const BootstrapCheckbox = forwardRef(({ onClick, ...rest }, ref) => (
//   <div className='custom-control custom-checkbox'>
//     <input type='checkbox' className='custom-control-input' ref={ref} {...rest} />
//     <label className='custom-control-label' onClick={onClick} />
//   </div>
// ))

// ** Vars
const states = ['success', 'danger', 'warning', 'info', 'dark', 'primary', 'secondary']

const data = [
  {
    responsive_id: '',
    id: 1,
    avatar: '10.jpg',
    full_name: "Korrie O'Crevy",
    post: 'Nuclear Power Engineer',
    email: 'kocrevy0@thetimes.co.uk',
    city: 'Krasnosilka',
    start_date: '09/23/2016',
    salary: '$23896.35',
    age: '61',
    experience: '1 Year',
    status: 2,
    group:'Group 1',
    company: 'Worldstage',
    email_status: 'SENT', 
    last_online: 'February 16 2022'
  },
  {
    responsive_id: '',
    id: 2,
    avatar: '1.jpg',
    full_name: 'Bailie Coulman',
    post: 'VP Quality Control',
    email: 'bcoulman1@yolasite.com',
    city: 'Hinigaran',
    start_date: '05/20/2018',
    salary: '$13633.69',
    age: '63',
    experience: '3 Years',
    status: 2,
    group:'Group 1',
    company: 'Worldstage',
    email_status: 'NOT SENT', 
    last_online: 'February 16 2022'
  },
  {
    responsive_id: '',
    id: 3,
    avatar: '9.jpg',
    full_name: 'Stella Ganderton',
    post: 'Operator',
    email: 'sganderton2@tuttocitta.it',
    city: 'Golcowa',
    start_date: '03/24/2018',
    salary: '$13076.28',
    age: '66',
    experience: '6 Years',
    status: 5,
    company: 'Worldstage',
    email_status: 'SENT', 
    last_online: 'February 16 2022'
  },
  {
    responsive_id: '',
    id: 4,
    avatar: '10.jpg',
    full_name: 'Dorolice Crossman',
    post: 'Cost Accountant',
    email: 'dcrossman3@google.co.jp',
    city: 'Paquera',
    start_date: '12/03/2017',
    salary: '$12336.17',
    age: '22',
    experience: '2 Years',
    status: 2,
    company: 'Worldstage',
    email_status: 'NOT SENT', 
    last_online: 'February 16 2022'
  },
  {
    responsive_id: '',
    id: 5,
    avatar: '',
    full_name: 'Harmonia Nisius',
    post: 'Senior Cost Accountant',
    email: 'hnisius4@gnu.org',
    city: 'Lucan',
    start_date: '08/25/2017',
    salary: '$10909.52',
    age: '33',
    experience: '3 Years',
    status: 2,
    company: 'Worldstage',
    email_status: 'SENT', 
    last_online: 'February 16 2022'
  },
  {
    responsive_id: '',
    id: 6,
    avatar: '',
    full_name: 'Genevra Honeywood',
    post: 'Geologist',
    email: 'ghoneywood5@narod.ru',
    city: 'Maofan',
    start_date: '06/01/2017',
    salary: '$17803.80',
    age: '61',
    experience: '1 Year',
    status: 1,
    company: 'Worldstage',
    email_status: 'SENT', 
    last_online: 'February 16 2022'
  },
  {
    responsive_id: '',
    id: 7,
    avatar: '',
    full_name: 'Eileen Diehn',
    post: 'Environmental Specialist',
    email: 'ediehn6@163.com',
    city: 'Lampuyang',
    start_date: '10/15/2017',
    salary: '$18991.67',
    age: '59',
    experience: '9 Years',
    status: 3,
    company: 'Worldstage',
    email_status: 'SENT', 
    last_online: 'February 16 2022'
  },
  {
    responsive_id: '',
    id: 8,
    avatar: '9.jpg',
    full_name: 'Richardo Aldren',
    post: 'Senior Sales Associate',
    email: 'raldren7@mtv.com',
    city: 'Skoghall',
    start_date: '11/05/2016',
    salary: '$19230.13',
    age: '55',
    experience: '5 Years',
    status: 3,
    company: 'Worldstage',
    email_status: 'SENT', 
    last_online: 'February 16 2022'
  },
  {
    responsive_id: '',
    id: 9,
    avatar: '2.jpg',
    full_name: 'Allyson Moakler',
    post: 'Safety Technician',
    email: 'amoakler8@shareasale.com',
    city: 'Mogilany',
    start_date: '12/29/2018',
    salary: '$11677.32',
    age: '39',
    experience: '9 Years',
    status: 5, 
    last_online: 'February 16 2022'
  },
  {
    responsive_id: '',
    id: 10,
    avatar: '9.jpg',
    full_name: 'Merline Penhalewick',
    post: 'Junior Executive',
    email: 'mpenhalewick9@php.net',
    city: 'Kanuma',
    start_date: '04/19/2019',
    salary: '$15939.52',
    age: '23',
    experience: '3 Years',
    status: 2, 
    last_online: 'February 16 2022'
  },
  {
    responsive_id: '',
    id: 11,
    avatar: '',
    full_name: 'De Falloon',
    post: 'Sales Representative',
    email: 'dfalloona@ifeng.com',
    city: 'Colima',
    start_date: '06/12/2018',
    salary: '$19252.12',
    age: '30',
    experience: '0 Year',
    status: 4
  },
  {
    responsive_id: '',
    id: 12,
    avatar: '',
    full_name: 'Cyrus Gornal',
    post: 'Senior Sales Associate',
    email: 'cgornalb@fda.gov',
    city: 'Boro Utara',
    start_date: '12/09/2017',
    salary: '$16745.47',
    age: '22',
    experience: '2 Years',
    status: 4
  },
  {
    responsive_id: '',
    id: 13,
    avatar: '',
    full_name: 'Tallou Balf',
    post: 'Staff Accountant',
    email: 'tbalfc@sina.com.cn',
    city: 'Siliana',
    start_date: '01/21/2016',
    salary: '$15488.53',
    age: '36',
    experience: '6 Years',
    status: 4
  },
  {
    responsive_id: '',
    id: 14,
    avatar: '',
    full_name: 'Othilia Extill',
    post: 'Associate Professor',
    email: 'oextilld@theatlantic.com',
    city: 'Brzyska',
    start_date: '02/01/2016',
    salary: '$18442.34',
    age: '43',
    experience: '3 Years',
    status: 2
  },
  {
    responsive_id: '',
    id: 15,
    avatar: '',
    full_name: 'Wilmar Bourton',
    post: 'Administrative Assistant',
    email: 'wbourtone@sakura.ne.jp',
    city: 'Bích Động',
    start_date: '04/25/2018',
    salary: '$13304.45',
    age: '19',
    experience: '9 Years',
    status: 5
  },
  {
    responsive_id: '',
    id: 16,
    avatar: '4.jpg',
    full_name: 'Robinson Brazenor',
    post: 'General Manager',
    email: 'rbrazenorf@symantec.com',
    city: 'Gendiwu',
    start_date: '12/23/2017',
    salary: '$11953.08',
    age: '66',
    experience: '6 Years',
    status: 5
  },
  {
    responsive_id: '',
    id: 17,
    avatar: '',
    full_name: 'Nadia Bettenson',
    post: 'Environmental Tech',
    email: 'nbettensong@joomla.org',
    city: 'Chabařovice',
    start_date: '07/11/2018',
    salary: '$20484.44',
    age: '64',
    experience: '4 Years',
    status: 1
  },
  {
    responsive_id: '',
    id: 18,
    avatar: '',
    full_name: 'Titus Hayne',
    post: 'Web Designer',
    email: 'thayneh@kickstarter.com',
    city: 'Yangon',
    start_date: '05/25/2019',
    salary: '$16871.48',
    age: '59',
    experience: '9 Years',
    status: 1
  },
  {
    responsive_id: '',
    id: 19,
    avatar: '5.jpg',
    full_name: 'Roxie Huck',
    post: 'Administrative Assistant',
    email: 'rhucki@ed.gov',
    city: 'Polýkastro',
    start_date: '04/04/2019',
    salary: '$19653.56',
    age: '41',
    experience: '1 Year',
    status: 4
  },
  {
    responsive_id: '',
    id: 20,
    avatar: '7.jpg',
    full_name: 'Latashia Lewtey',
    post: 'Actuary',
    email: 'llewteyj@sun.com',
    city: 'Hougong',
    start_date: '08/03/2017',
    salary: '$18303.87',
    age: '35',
    experience: '5 Years',
    status: 1
  },
  {
    responsive_id: '',
    id: 21,
    avatar: '',
    full_name: 'Natalina Tyne',
    post: 'Software Engineer',
    email: 'ntynek@merriam-webster.com',
    city: 'Yanguan',
    start_date: '03/16/2019',
    salary: '$15256.40',
    age: '30',
    experience: '0 Year',
    status: 2
  },
  {
    responsive_id: '',
    id: 22,
    avatar: '',
    full_name: 'Faun Josefsen',
    post: 'Analog Circuit Design manager',
    email: 'fjosefsenl@samsung.com',
    city: 'Wengyang',
    start_date: '07/08/2017',
    salary: '$11209.16',
    age: '40',
    experience: '0 Year',
    status: 3
  },
  {
    responsive_id: '',
    id: 23,
    avatar: '9.jpg',
    full_name: 'Rosmunda Steed',
    post: 'Assistant Media Planner',
    email: 'rsteedm@xing.com',
    city: 'Manzanares',
    start_date: '12/23/2017',
    salary: '$13778.34',
    age: '21',
    experience: '1 Year',
    status: 5
  },
  {
    responsive_id: '',
    id: 24,
    avatar: '',
    full_name: 'Scott Jiran',
    post: 'Graphic Designer',
    email: 'sjirann@simplemachines.org',
    city: 'Pinglin',
    start_date: '05/26/2016',
    salary: '$23081.71',
    age: '23',
    experience: '3 Years',
    status: 1
  },
  {
    responsive_id: '',
    id: 25,
    avatar: '',
    full_name: 'Carmita Medling',
    post: 'Accountant',
    email: 'cmedlingo@hp.com',
    city: 'Bourges',
    start_date: '07/31/2019',
    salary: '$13602.24',
    age: '47',
    experience: '7 Years',
    status: 3
  },
  {
    responsive_id: '',
    id: 26,
    avatar: '2.jpg',
    full_name: 'Morgen Benes',
    post: 'Senior Sales Associate',
    email: 'mbenesp@ted.com',
    city: 'Cà Mau',
    start_date: '04/10/2016',
    salary: '$16969.63',
    age: '42',
    experience: '2 Years',
    status: 4
  },
  {
    responsive_id: '',
    id: 27,
    avatar: '',
    full_name: 'Onfroi Doughton',
    post: 'Civil Engineer',
    email: 'odoughtonq@aboutads.info',
    city: 'Utrecht (stad)',
    start_date: '09/29/2018',
    salary: '$23796.62',
    age: '28',
    experience: '8 Years',
    status: 3
  },
  {
    responsive_id: '',
    id: 28,
    avatar: '',
    full_name: 'Kliment McGinney',
    post: 'Chief Design Engineer',
    email: 'kmcginneyr@paginegialle.it',
    city: 'Xiaocheng',
    start_date: '07/09/2018',
    salary: '$24027.81',
    age: '28',
    experience: '8 Years',
    status: 4
  },
  {
    responsive_id: '',
    id: 29,
    avatar: '',
    full_name: 'Devin Bridgland',
    post: 'Tax Accountant',
    email: 'dbridglands@odnoklassniki.ru',
    city: 'Baoli',
    start_date: '07/17/2016',
    salary: '$13508.15',
    age: '48',
    experience: '8 Years',
    status: 3
  },
  {
    responsive_id: '',
    id: 30,
    avatar: '6.jpg',
    full_name: 'Gilbert McFade',
    post: 'Biostatistician',
    email: 'gmcfadet@irs.gov',
    city: 'Deje',
    start_date: '08/28/2018',
    salary: '$21632.30',
    age: '20',
    experience: '0 Year',
    status: 2
  },
  {
    responsive_id: '',
    id: 31,
    avatar: '',
    full_name: 'Teressa Bleakman',
    post: 'Senior Editor',
    email: 'tbleakmanu@phpbb.com',
    city: 'Žebrák',
    start_date: '09/03/2016',
    salary: '$24875.41',
    age: '37',
    experience: '7 Years',
    status: 5
  },
  {
    responsive_id: '',
    id: 32,
    avatar: '',
    full_name: 'Marcelia Alleburton',
    post: 'Safety Technician',
    email: 'malleburtonv@amazon.com',
    city: 'Basail',
    start_date: '06/02/2016',
    salary: '$23888.98',
    age: '53',
    experience: '3 Years',
    status: 2
  },
  {
    responsive_id: '',
    id: 33,
    avatar: '7.jpg',
    full_name: 'Aili De Coursey',
    post: 'Environmental Specialist',
    email: 'adew@etsy.com',
    city: 'Łazy',
    start_date: '09/30/2016',
    salary: '$14082.44',
    age: '27',
    experience: '7 Years',
    status: 5
  },
  {
    responsive_id: '',
    id: 34,
    avatar: '6.jpg',
    full_name: 'Charlton Chatres',
    post: 'Analyst Programmer',
    email: 'cchatresx@goo.gl',
    city: 'Reguengos de Monsaraz',
    start_date: '04/07/2016',
    salary: '$21386.52',
    age: '22',
    experience: '2 Years',
    status: 3
  },
  {
    responsive_id: '',
    id: 35,
    avatar: '1.jpg',
    full_name: 'Nat Hugonnet',
    post: 'Financial Advisor',
    email: 'nhugonnety@wufoo.com',
    city: 'Pimentel',
    start_date: '09/11/2019',
    salary: '$13835.97',
    age: '46',
    experience: '6 Years',
    status: 4
  },
  {
    responsive_id: '',
    id: 36,
    avatar: '',
    full_name: 'Lorine Hearsum',
    post: 'Payment Adjustment Coordinator',
    email: 'lhearsumz@google.co.uk',
    city: 'Shuiying',
    start_date: '03/05/2019',
    salary: '$22093.91',
    age: '47',
    experience: '7 Years',
    status: 4
  },
  {
    responsive_id: '',
    id: 37,
    avatar: '8.jpg',
    full_name: 'Sheila-kathryn Haborn',
    post: 'Environmental Specialist',
    email: 'shaborn10@about.com',
    city: 'Lewolang',
    start_date: '11/10/2018',
    salary: '$24624.23',
    age: '51',
    experience: '1 Year',
    status: 3
  },
  {
    responsive_id: '',
    id: 38,
    avatar: '3.jpg',
    full_name: 'Alma Harvatt',
    post: 'Administrative Assistant',
    email: 'aharvatt11@addtoany.com',
    city: 'Ulundi',
    start_date: '11/04/2016',
    salary: '$21782.82',
    age: '41',
    experience: '1 Year',
    status: 1
  },
  {
    responsive_id: '',
    id: 39,
    avatar: '2.jpg',
    full_name: 'Beatrix Longland',
    post: 'VP Quality Control',
    email: 'blongland12@gizmodo.com',
    city: 'Damu',
    start_date: '07/18/2016',
    salary: '$22794.60',
    age: '62',
    experience: '2 Years',
    status: 2
  },
  {
    responsive_id: '',
    id: 40,
    avatar: '4.jpg',
    full_name: 'Hammad Condell',
    post: 'Project Manager',
    email: 'hcondell13@tiny.cc',
    city: 'Bulung’ur',
    start_date: '11/04/2018',
    salary: '$10872.83',
    age: '37',
    experience: '7 Years',
    status: 4
  },
  {
    responsive_id: '',
    id: 41,
    avatar: '',
    full_name: 'Parker Bice',
    post: 'Technical Writer',
    email: 'pbice14@ameblo.jp',
    city: 'Shanlian',
    start_date: '03/02/2016',
    salary: '$17471.92',
    age: '65',
    experience: '5 Years',
    status: 5
  },
  {
    responsive_id: '',
    id: 42,
    avatar: '',
    full_name: 'Lowrance Orsi',
    post: 'Biostatistician',
    email: 'lorsi15@wp.com',
    city: 'Dengteke',
    start_date: '12/10/2018',
    salary: '$24719.51',
    age: '64',
    experience: '4 Years',
    status: 1
  },
  {
    responsive_id: '',
    id: 43,
    avatar: '10.jpg',
    full_name: 'Ddene Chaplyn',
    post: 'Environmental Tech',
    email: 'dchaplyn16@nymag.com',
    city: 'Lattes',
    start_date: '01/23/2019',
    salary: '$11958.33',
    age: '38',
    experience: '8 Years',
    status: 2
  },
  {
    responsive_id: '',
    id: 44,
    avatar: '',
    full_name: 'Washington Bygraves',
    post: 'Human Resources Manager',
    email: 'wbygraves17@howstuffworks.com',
    city: 'Zlaté Hory',
    start_date: '09/07/2016',
    salary: '$10552.43',
    age: '37',
    experience: '7 Years',
    status: 1
  },
  {
    responsive_id: '',
    id: 45,
    avatar: '7.jpg',
    full_name: 'Meghann Bodechon',
    post: 'Operator',
    email: 'mbodechon18@1und1.de',
    city: 'Itō',
    start_date: '07/23/2018',
    salary: '$23024.28',
    age: '61',
    experience: '1 Year',
    status: 4
  },
  {
    responsive_id: '',
    id: 46,
    avatar: '1.jpg',
    full_name: 'Moshe De Ambrosis',
    post: 'Recruiting Manager',
    email: 'mde19@purevolume.com',
    city: 'San Diego',
    start_date: '02/10/2018',
    salary: '$10409.90',
    age: '47',
    experience: '7 Years',
    status: 5
  },
  {
    responsive_id: '',
    id: 47,
    avatar: '5.jpg',
    full_name: 'Had Chatelot',
    post: 'Cost Accountant',
    email: 'hchatelot1a@usatoday.com',
    city: 'Mercedes',
    start_date: '11/23/2016',
    salary: '$11446.30',
    age: '64',
    experience: '4 Years',
    status: 4
  },
  {
    responsive_id: '',
    id: 48,
    avatar: '',
    full_name: 'Georgia McCrum',
    post: 'Registered Nurse',
    email: 'gmccrum1b@icio.us',
    city: 'Nggalak',
    start_date: '04/19/2018',
    salary: '$14002.31',
    age: '63',
    experience: '3 Years',
    status: 1
  },
  {
    responsive_id: '',
    id: 49,
    avatar: '8.jpg',
    full_name: 'Krishnah Stilldale',
    post: 'VP Accounting',
    email: 'kstilldale1c@chronoengine.com',
    city: 'Slavs’ke',
    start_date: '03/18/2017',
    salary: '$10704.29',
    age: '56',
    experience: '6 Years',
    status: 1
  },
  {
    responsive_id: '',
    id: 50,
    avatar: '4.jpg',
    full_name: 'Mario Umbert',
    post: 'Research Assistant',
    email: 'mumbert1d@digg.com',
    city: 'Chorotis',
    start_date: '05/13/2019',
    salary: '$21813.54',
    age: '43',
    experience: '3 Years',
    status: 1
  },
  {
    responsive_id: '',
    id: 51,
    avatar: '',
    full_name: 'Edvard Dixsee',
    post: 'Graphic Designer',
    email: 'edixsee1e@unblog.fr',
    city: 'Rancharia',
    start_date: '04/23/2019',
    salary: '$18053.11',
    age: '46',
    experience: '6 Years',
    status: 3
  },
  {
    responsive_id: '',
    id: 52,
    avatar: '9.jpg',
    full_name: 'Tammie Davydoch',
    post: 'VP Quality Control',
    email: 'tdavydoch1f@examiner.com',
    city: 'Mamedkala',
    start_date: '04/19/2016',
    salary: '$17617.08',
    age: '47',
    experience: '7 Years',
    status: 3
  },
  {
    responsive_id: '',
    id: 53,
    avatar: '',
    full_name: 'Benito Rodolico',
    post: 'Safety Technician',
    email: 'brodolico1g@sciencedirect.com',
    city: 'Wonosobo',
    start_date: '10/06/2018',
    salary: '$18866.55',
    age: '21',
    experience: '1 Year',
    status: 5
  },
  {
    responsive_id: '',
    id: 54,
    avatar: '',
    full_name: 'Marco Pennings',
    post: 'Compensation Analyst',
    email: 'mpennings1h@bizjournals.com',
    city: 'Umag',
    start_date: '06/15/2017',
    salary: '$13722.18',
    age: '30',
    experience: '0 Year',
    status: 3
  },
  {
    responsive_id: '',
    id: 55,
    avatar: '',
    full_name: "Tommie O'Corr",
    post: 'Quality Engineer',
    email: 'tocorr1i@nyu.edu',
    city: 'Olhos de Água',
    start_date: '09/26/2018',
    salary: '$15228.80',
    age: '51',
    experience: '1 Year',
    status: 1
  },
  {
    responsive_id: '',
    id: 56,
    avatar: '1.jpg',
    full_name: 'Cybill Poyle',
    post: 'Cost Accountant',
    email: 'cpoyle1j@amazon.com',
    city: 'Hamm',
    start_date: '01/03/2016',
    salary: '$13951.96',
    age: '29',
    experience: '9 Years',
    status: 1
  },
  {
    responsive_id: '',
    id: 57,
    avatar: '6.jpg',
    full_name: 'Norry Stoller',
    post: 'Human Resources Manager',
    email: 'nstoller1k@noaa.gov',
    city: 'Ruukki',
    start_date: '02/04/2018',
    salary: '$15100.00',
    age: '27',
    experience: '7 Years',
    status: 4
  },
  {
    responsive_id: '',
    id: 58,
    avatar: '',
    full_name: 'Wendi Somerlie',
    post: 'Systems Administrator',
    email: 'wsomerlie1l@accuweather.com',
    city: 'Meicheng',
    start_date: '04/22/2016',
    salary: '$20023.52',
    age: '28',
    experience: '9 Years',
    status: 5
  },
  {
    responsive_id: '',
    id: 59,
    avatar: '',
    full_name: 'Ferdie Georgeon',
    post: 'Geologist',
    email: 'fgeorgeon1m@nhs.uk',
    city: 'Tanahbeureum',
    start_date: '04/08/2019',
    salary: '$12630.26',
    age: '28',
    experience: '1 Year',
    status: 2
  },
  {
    responsive_id: '',
    id: 60,
    avatar: '',
    full_name: 'Jules Auten',
    post: 'Desktop Support Technician',
    email: 'jauten1n@foxnews.com',
    city: 'Mojo',
    start_date: '08/13/2019',
    salary: '$13870.62',
    age: '48',
    experience: '5 Years',
    status: 4
  },
  {
    responsive_id: '',
    id: 61,
    avatar: '3.jpg',
    full_name: 'Nichole Dacres',
    post: 'Mechanical Systems Engineer',
    email: 'ndacres1o@apache.org',
    city: 'Kimanuit',
    start_date: '11/06/2017',
    salary: '$18220.51',
    age: '20',
    experience: '0 Year',
    status: 3
  },
  {
    responsive_id: '',
    id: 62,
    avatar: '1.jpg',
    full_name: 'Holly Edgworth',
    post: 'Junior Executive',
    email: 'hedgworth1p@craigslist.org',
    city: 'Pedreira',
    start_date: '08/05/2017',
    salary: '$13999.88',
    age: '37',
    experience: '0 Year',
    status: 5
  },
  {
    responsive_id: '',
    id: 63,
    avatar: '9.jpg',
    full_name: 'Henriette Croft',
    post: 'Food Chemist',
    email: 'hcroft1q@desdev.cn',
    city: 'Taizhou',
    start_date: '09/12/2019',
    salary: '$11049.79',
    age: '53',
    experience: '1 Year',
    status: 5
  },
  {
    responsive_id: '',
    id: 64,
    avatar: '',
    full_name: 'Annetta Glozman',
    post: 'Staff Accountant',
    email: 'aglozman1r@storify.com',
    city: 'Pendawanbaru',
    start_date: '08/25/2017',
    salary: '$10745.32',
    age: '27',
    experience: '3 Years',
    status: 5
  },
  {
    responsive_id: '',
    id: 65,
    avatar: '',
    full_name: 'Cletis Cervantes',
    post: 'Health Coach',
    email: 'ccervantes1s@de.vu',
    city: 'Solnechnyy',
    start_date: '05/24/2018',
    salary: '$24769.08',
    age: '22',
    experience: '7 Years',
    status: 1
  },
  {
    responsive_id: '',
    id: 66,
    avatar: '9.jpg',
    full_name: 'Christos Kiley',
    post: 'Geologist',
    email: 'ckiley1t@buzzfeed.com',
    city: 'El Bolsón',
    start_date: '02/27/2019',
    salary: '$16053.15',
    age: '46',
    experience: '2 Years',
    status: 1
  },
  {
    responsive_id: '',
    id: 67,
    avatar: '7.jpg',
    full_name: 'Silvain Siebert',
    post: 'VP Sales',
    email: 'ssiebert1u@domainmarket.com',
    city: 'Cadiz',
    start_date: '09/23/2017',
    salary: '$23347.17',
    age: '47',
    experience: '8 Years',
    status: 5
  },
  {
    responsive_id: '',
    id: 68,
    avatar: '',
    full_name: 'Sharla Ibberson',
    post: 'Payment Adjustment Coordinator',
    email: 'sibberson1v@virginia.edu',
    city: 'Lamam',
    start_date: '11/01/2016',
    salary: '$15658.40',
    age: '51',
    experience: '8 Years',
    status: 1
  },
  {
    responsive_id: '',
    id: 69,
    avatar: '7.jpg',
    full_name: 'Ripley Rentcome',
    post: 'Physical Therapy Assistant',
    email: 'rrentcome1w@youtu.be',
    city: 'Dashkawka',
    start_date: '07/15/2018',
    salary: '$15396.66',
    age: '41',
    experience: '8 Years',
    status: 2
  },
  {
    responsive_id: '',
    id: 70,
    avatar: '',
    full_name: 'Chrisse Birrane',
    post: 'Chemical Engineer',
    email: 'cbirrane1x@google.com.br',
    city: 'Las Toscas',
    start_date: '05/22/2016',
    salary: '$15823.40',
    age: '62',
    experience: '0 Year',
    status: 5
  },
  {
    responsive_id: '',
    id: 71,
    avatar: '',
    full_name: 'Georges Tesyro',
    post: 'Human Resources Manager',
    email: 'gtesyro1y@last.fm',
    city: 'Gabao',
    start_date: '01/27/2019',
    salary: '$19051.25',
    age: '37',
    experience: '7 Years',
    status: 1
  },
  {
    responsive_id: '',
    id: 72,
    avatar: '',
    full_name: 'Bondon Hazard',
    post: 'Geological Engineer',
    email: 'bhazard1z@over-blog.com',
    city: 'Llano de Piedra',
    start_date: '01/17/2019',
    salary: '$11632.84',
    age: '65',
    experience: '3 Years',
    status: 4
  },
  {
    responsive_id: '',
    id: 73,
    avatar: '5.jpg',
    full_name: 'Aliza MacElholm',
    post: 'VP Sales',
    email: 'amacelholm20@printfriendly.com',
    city: 'Sosnovyy Bor',
    start_date: '11/17/2017',
    salary: '$16741.31',
    age: '64',
    experience: '7 Years',
    status: 2
  },
  {
    responsive_id: '',
    id: 74,
    avatar: '2.jpg',
    full_name: 'Lucas Witherdon',
    post: 'Senior Quality Engineer',
    email: 'lwitherdon21@storify.com',
    city: 'Staré Křečany',
    start_date: '09/26/2016',
    salary: '$19387.76',
    age: '38',
    experience: '2 Years',
    status: 3
  },
  {
    responsive_id: '',
    id: 75,
    avatar: '',
    full_name: 'Pegeen Peasegod',
    post: 'Web Designer',
    email: 'ppeasegod22@slideshare.net',
    city: 'Keda',
    start_date: '05/21/2016',
    salary: '$24014.04',
    age: '59',
    experience: '6 Years',
    status: 3
  },
  {
    responsive_id: '',
    id: 76,
    avatar: '',
    full_name: 'Elyn Watkinson',
    post: 'Structural Analysis Engineer',
    email: 'ewatkinson23@blogspot.com',
    city: 'Osan',
    start_date: '09/30/2016',
    salary: '$14493.51',
    age: '55',
    experience: '7 Years',
    status: 1
  },
  {
    responsive_id: '',
    id: 77,
    avatar: '10.jpg',
    full_name: 'Babb Skirving',
    post: 'Analyst Programmer',
    email: 'bskirving24@cbsnews.com',
    city: 'Balky',
    start_date: '09/27/2016',
    salary: '$24733.28',
    age: '39',
    experience: '1 Year',
    status: 4
  },
  {
    responsive_id: '',
    id: 78,
    avatar: '',
    full_name: 'Shelli Ondracek',
    post: 'Financial Advisor',
    email: 'sondracek25@plala.or.jp',
    city: 'Aoluguya Ewenke Minzu',
    start_date: '03/28/2016',
    salary: '$21922.17',
    age: '23',
    experience: '1 Year',
    status: 3
  },
  {
    responsive_id: '',
    id: 79,
    avatar: '9.jpg',
    full_name: 'Stanislaw Melloy',
    post: 'Sales Associate',
    email: 'smelloy26@fastcompany.com',
    city: 'Funafuti',
    start_date: '04/13/2017',
    salary: '$16944.42',
    age: '30',
    experience: '2 Years',
    status: 2
  },
  {
    responsive_id: '',
    id: 80,
    avatar: '',
    full_name: 'Seamus Eisikovitsh',
    post: 'Legal Assistant',
    email: 'seisikovitsh27@usgs.gov',
    city: 'Cangkringan',
    start_date: '05/28/2018',
    salary: '$21963.69',
    age: '22',
    experience: '7 Years',
    status: 1
  },
  {
    responsive_id: '',
    id: 81,
    avatar: '2.jpg',
    full_name: 'Tammie Wattins',
    post: 'Web Designer',
    email: 'twattins28@statcounter.com',
    city: 'Xilin',
    start_date: '08/07/2018',
    salary: '$16049.93',
    age: '36',
    experience: '5 Years',
    status: 2
  },
  {
    responsive_id: '',
    id: 82,
    avatar: '8.jpg',
    full_name: 'Aila Quailadis',
    post: 'Technical Writer',
    email: 'aquail29@prlog.org',
    city: 'Shuangchahe',
    start_date: '02/11/2018',
    salary: '$24137.29',
    age: '43',
    experience: '4 Years',
    status: 4
  },
  {
    responsive_id: '',
    id: 83,
    avatar: '',
    full_name: 'Myrvyn Gilogly',
    post: 'Research Associate',
    email: 'mgilogly2a@elpais.com',
    city: 'Prince Rupert',
    start_date: '05/13/2018',
    salary: '$10089.96',
    age: '19',
    experience: '8 Years',
    status: 4
  },
  {
    responsive_id: '',
    id: 84,
    avatar: '5.jpg',
    full_name: 'Hanna Langthorne',
    post: 'Analyst Programmer',
    email: 'hlangthorne2b@stumbleupon.com',
    city: 'Guaynabo',
    start_date: '11/11/2018',
    salary: '$14227.10',
    age: '21',
    experience: '7 Years',
    status: 3
  },
  {
    responsive_id: '',
    id: 85,
    avatar: '',
    full_name: 'Ruby Gimblet',
    post: 'Registered Nurse',
    email: 'rgimblet2c@1688.com',
    city: 'Nanyulinxi',
    start_date: '03/28/2016',
    salary: '$19562.59',
    age: '30',
    experience: '1 Year',
    status: 2
  },
  {
    responsive_id: '',
    id: 86,
    avatar: '4.jpg',
    full_name: 'Louis Paszak',
    post: 'Programmer',
    email: 'lpaszak2d@behance.net',
    city: 'Chiscas',
    start_date: '04/25/2016',
    salary: '$17178.86',
    age: '51',
    experience: '7 Years',
    status: 5
  },
  {
    responsive_id: '',
    id: 87,
    avatar: '',
    full_name: 'Glennie Riolfi',
    post: 'Computer Systems Analyst',
    email: 'griolfi2e@drupal.org',
    city: 'Taung',
    start_date: '06/18/2018',
    salary: '$15089.83',
    age: '29',
    experience: '4 Years',
    status: 3
  },
  {
    responsive_id: '',
    id: 88,
    avatar: '',
    full_name: 'Jemimah Morgan',
    post: 'Staff Accountant',
    email: 'jmorgan2f@nifty.com',
    city: 'La Esperanza',
    start_date: '01/17/2016',
    salary: '$18330.72',
    age: '27',
    experience: '3 Years',
    status: 1
  },
  {
    responsive_id: '',
    id: 89,
    avatar: '10.jpg',
    full_name: 'Talya Brandon',
    post: 'Food Chemist',
    email: 'tbrandon2g@ucoz.com',
    city: 'Zaječar',
    start_date: '10/08/2018',
    salary: '$16284.64',
    age: '28',
    experience: '6 Years',
    status: 1
  },
  {
    responsive_id: '',
    id: 90,
    avatar: '6.jpg',
    full_name: 'Renate Shay',
    post: 'Recruiter',
    email: 'rshay2h@tumblr.com',
    city: 'Pueblo Viejo',
    start_date: '03/15/2017',
    salary: '$18523.75',
    age: '28',
    experience: '3 Years',
    status: 1
  },
  {
    responsive_id: '',
    id: 91,
    avatar: '',
    full_name: 'Julianne Bartosik',
    post: 'Senior Cost Accountant',
    email: 'jbartosik2i@state.gov',
    city: 'Botlhapatlou',
    start_date: '02/06/2017',
    salary: '$17607.66',
    age: '48',
    experience: '6 Years',
    status: 3
  },
  {
    responsive_id: '',
    id: 92,
    avatar: '3.jpg',
    full_name: 'Yvonne Emberton',
    post: 'Recruiter',
    email: 'yemberton2j@blog.com',
    city: 'Nagcarlan',
    start_date: '02/13/2017',
    salary: '$17550.18',
    age: '20',
    experience: '1 Year',
    status: 4
  },
  {
    responsive_id: '',
    id: 93,
    avatar: '8.jpg',
    full_name: 'Danya Faichnie',
    post: 'Social Worker',
    email: 'dfaichnie2k@weather.com',
    city: 'Taling',
    start_date: '07/29/2019',
    salary: '$18469.35',
    age: '37',
    experience: '3 Years',
    status: 4
  },
  {
    responsive_id: '',
    id: 94,
    avatar: '',
    full_name: 'Ronica Hasted',
    post: 'Software Consultant',
    email: 'rhasted2l@hexun.com',
    city: 'Gangkou',
    start_date: '07/04/2019',
    salary: '$24866.66',
    age: '53',
    experience: '7 Years',
    status: 4
  },
  {
    responsive_id: '',
    id: 95,
    avatar: '2.jpg',
    full_name: 'Edwina Ebsworth',
    post: 'Human Resources Assistant',
    email: 'eebsworth2m@sbwire.com',
    city: 'Puzi',
    start_date: '09/27/2018',
    salary: '$19586.23',
    age: '27',
    experience: '2 Years',
    status: 1
  },
  {
    responsive_id: '',
    id: 96,
    avatar: '',
    full_name: 'Alaric Beslier',
    post: 'Tax Accountant',
    email: 'abeslier2n@zimbio.com',
    city: 'Ocucaje',
    start_date: '04/16/2017',
    salary: '$19366.53',
    age: '22',
    experience: '8 Years',
    status: 4
  },
  {
    responsive_id: '',
    id: 97,
    avatar: '',
    full_name: 'Reina Peckett',
    post: 'Quality Control Specialist',
    email: 'rpeckett2o@timesonline.co.uk',
    city: 'Anyang',
    start_date: '05/20/2018',
    salary: '$16619.40',
    age: '46',
    experience: '8 Years',
    status: 4
  },
  {
    responsive_id: '',
    id: 98,
    avatar: '7.jpg',
    full_name: 'Olivette Gudgin',
    post: 'Paralegal',
    email: 'ogudgin2p@gizmodo.com',
    city: 'Fujinomiya',
    start_date: '04/09/2019',
    salary: '$15211.60',
    age: '47',
    experience: '8 Years',
    status: 2
  },
  {
    responsive_id: '',
    id: 99,
    avatar: '10.jpg',
    full_name: 'Evangelina Carnock',
    post: 'Cost Accountant',
    email: 'ecarnock2q@washington.edu',
    city: 'Doushaguan',
    start_date: '01/26/2017',
    salary: '$23704.82',
    age: '51',
    experience: '0 Year',
    status: 4
  },
  {
    responsive_id: '',
    id: 100,
    avatar: '',
    full_name: 'Glyn Giacoppo',
    post: 'Software Test Engineer',
    email: 'ggiacoppo2r@apache.org',
    city: 'Butha-Buthe',
    start_date: '04/15/2017',
    salary: '$24973.48',
    age: '41',
    experience: '7 Years',
    status: 2
  }
]

const status = {
  1: { title: 'Current', color: 'light-primary' },
  2: { title: 'Professional', color: 'light-success' },
  3: { title: 'Rejected', color: 'light-danger' },
  4: { title: 'Resigned', color: 'light-warning' },
  5: { title: 'Applied', color: 'light-info' }
}

const DataTableWithButtons = () => {
  const dispatch = useDispatch()

  // ** States
  const [modal, setModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [searchValue, setSearchValue] = useState('')
  const [filteredData, setFilteredData] = useState([])

  const [show, setShow] = useState(false)
  const [editShow, setEditShow] = useState(false)
  const [setPrevilege, setShowPrevilege] = useState(false)

  // ** Function to handle Modal toggle
  const handleModal = () => setModal(!modal)
  const [picker, setPicker] = useState(new Date())
  const [count, setCount] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(7)

  const increaseCount = () => {
    setCount(count + 1)
  }

  const deleteForm = e => {
    e.preventDefault()
    const slideDownWrapper = e.target.closest('.react-slidedown'),
      form = e.target.closest('form')
    if (slideDownWrapper) {
      slideDownWrapper.remove()
    } else {
      form.remove()
    }
  }

  // ** Get data on mount
  useEffect(() => {
    // dispatch(
    //   getData({
    //     page: currentPage,
    //     perPage: rowsPerPage,
    //     q: searchValue
    //   })
    // )
  }, [dispatch])
  
  // ** Function to handle per page
  const handlePerPage = e => {
    // dispatch(
    //   getData({
    //     page: currentPage,
    //     perPage: parseInt(e.target.value),
    //     q: searchValue
    //   })
    // )
    setRowsPerPage(parseInt(e.target.value))
  }

  const {
    reset,
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    // defaultValues: {
    //   username: selectedUser.name,
    //   // lastName: selectedUser.fullName.split(' ')[1],
    //   // firstName: selectedUser.fullName.split(' ')[0]
    //   // username: 'Test',
    //   lastName: 'LastName',
    //   firstName: 'First name'
    // }
  })
  
  const handleConfirmCancel = () => {
    return MySwal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-danger ml-1'
      },
      buttonsStyling: false
    }).then(function (result) {
      if (result.value) {
  
        // const token = "eyJhbGciOiJIUzUxMiIsImlhdCI6MTY0NDM4MDg0MywiZXhwIjoxNjQ0OTg1NjQzfQ.eyJpZCI6NywidXNlcl9yb2xlIjoxfQ.IyzNMBX9p9vXn5mas5emwjzMgF2i6sVi7R74_A6RSqrSHB38SduYb2ub73zNh8jqTMCjHp-c_kJmm15USqomMA"
  
        // axios({ 
        //   method: 'delete',
        //   url: `https://w-call-demo02.herokuapp.com/admin/delete_user/${row.id}`,
        //   headers: { 
        //               ContentType : 'application/json', 
        //               Authorization: `Token ${token}` 
        //             }
          
        // })
        // .then(response => {
        //   console.log(response)
        //   if (response.data.status === 200) {
            MySwal.fire({
              icon: 'success',
              title: 'Deleted!',
              text: 'Your file has been deleted.',
              customClass: {
                confirmButton: 'btn btn-success'
              }
            })
            
        //   } else if (response.data.status > 200 && response.data.status > 299) {
        //     // this.showToast("warning", response.data.message)
        //   } else throw response.data
        // })
        // .catch(error => {
        //   console.log(error)
        //   if (error && error.status === 401) {
        //       // this.setState({areaLoading: false})  
        //       // this.showToast("error", error.message)
        //       // localStorage.removeItem('authProject');
        //   }
        //   if (error) {
        //       // this.setState({areaLoading: false})  
        //       // this.showToast("error", error.message)
        //   } else {
        //       // this.setState({areaLoading: false})  
        //       // this.showToast("error", error.message)
        //   }
        // })
  
        
      } else if (result.dismiss === MySwal.DismissReason.cancel) {
        MySwal.fire({
          title: 'Cancelled',
          text: 'User Delete Cancelled',
          icon: 'error',
          customClass: {
            confirmButton: 'btn btn-success'
          }
        })
      }
    })
  }

  // ** Table Common Column
const columns = [
  {
    name: 'Name',
    selector: 'full_name',
    sortable: true,
    minWidth: '250px',
    cell: row => (
      <div className='d-flex align-items-center'>
        {row.avatar === '' ? (
          <Avatar color={`light-${states[row.status]}`} content={row.full_name} initials />
        ) : (
          <Avatar img={require(`@src/assets/images/portrait/small/avatar-s-${row.avatar}`).default} />
        )}
        <div className='user-info text-truncate ml-1'>
          <span className='d-block font-weight-bold text-truncate'>{row.full_name}</span>
          <small>{row.email}</small>
        </div>
      </div>
    )
  },
  {
    name: 'Company',
    selector: 'company',
    sortable: true,
    minWidth: '150px'
  },
  {
    name: 'Email Status',
    selector: 'email_status',
    sortable: true,
    minWidth: '100px'
  },
  {
    name: 'Updated',
    selector: 'start_date',
    sortable: true,
    minWidth: '150px'
  },
  {
    name: 'Last Online',
    selector: 'last_online',
    sortable: true,
    minWidth: '175px'
  },
  {
    name: 'Actions',
    allowOverflow: true,
    cell: row => {
      return (
        <div className='d-flex'>
          <UncontrolledDropdown>
            <DropdownToggle className='pr-1' tag='span'>
              <MoreVertical size={15} />
            </DropdownToggle>
            <DropdownMenu right>
                  <DropdownItem className='w-100' onClick={() => setEditShow(true)}>Edit</DropdownItem>
                  <DropdownItem className='w-100' onClick={() => handleConfirmCancel()} >Delete</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      )
    }
  }
]
  

  const uppy = new Uppy({
    meta: { type: 'avatar' },
    autoProceed: true,
    restrictions: { maxNumberOfFiles: 1 }
    // restrictions: { maxNumberOfFiles: 1, allowedFileTypes: ['image/*'] }
  })

  // uppy.use(Uppy.Tus, { endpoint: 'https://tusd.tusdemo.net/files/' })
  // /user/edit_user_details/<user_id>
  uppy.use(thumbnailGenerator)

  uppy.on('thumbnail:generated', (file, preview) => {
    const arr = previewArr
    arr.push(preview)
    setPreviewArr([...arr])
  })

  uppy.on('complete', (result) => {
    console.log(result)
    const img = result.successful
    const d = img[0].data
    console.log(img[0].data)
    // const encode_img = JSON.stringify(img[0].data)
    // console.log(encode_img)

    const token = "eyJhbGciOiJIUzUxMiIsImlhdCI6MTY0NDM4MDg0MywiZXhwIjoxNjQ0OTg1NjQzfQ.eyJpZCI6NywidXNlcl9yb2xlIjoxfQ.IyzNMBX9p9vXn5mas5emwjzMgF2i6sVi7R74_A6RSqrSHB38SduYb2ub73zNh8jqTMCjHp-c_kJmm15USqomMA"

    const formData = new FormData()
    formData.append('file', img[0].data)

    const body1 = {
      file: img[0].data
      // file: d
    }

    // console.log(formData)
    // console.log(body1)
    // console.log(body1.file)
    // const config = {
    //   method: 'put',
    //   url: `https://w-call-demo02.herokuapp.com/user/edit_user_details/7`,
    //   headers: { 
    //     // AccessControlAllowOrigin: '*',
    //     // ContentType: 'application/json',
    //     ContentType: 'multipart/form-data',
    //     Authorization: `Token ${token}`
    //   }
    //   // data: body1.file
    //   // file: body1
    //   // body1
      
    // }

    // axios(config, formData)
    // .then(function (response) {
    //   console.log(response)
    //   // data = response.data
    //   // setUserData(data)
    //   // handleModal()
    // })
    // .catch(function (error) {
    //   console.log(error)
    // })


    console.log('successful files:', result.successful)
    console.log('failed files:', result.failed)
  })

  const onSubmit = data => {
    if (Object.values(data).every(field => field.length > 0)) {
      setShow(false)
    } else {
      for (const key in data) {
        if (data[key].length === 0) {
          setError(key, {
            type: 'manual'
          })
        }
      }
    }
  }

  // ** Function to handle filter
  const handleFilter = e => {
    const value = e.target.value
    let updatedData = []
    setSearchValue(value)

    const status = {
      1: { title: 'Current', color: 'light-primary' },
      2: { title: 'Professional', color: 'light-success' },
      3: { title: 'Rejected', color: 'light-danger' },
      4: { title: 'Resigned', color: 'light-warning' },
      5: { title: 'Applied', color: 'light-info' }
    }

    if (value.length) {
      updatedData = data.filter(item => {
        const startsWith =
          item.full_name.toLowerCase().startsWith(value.toLowerCase()) ||
          item.post.toLowerCase().startsWith(value.toLowerCase()) ||
          item.email.toLowerCase().startsWith(value.toLowerCase()) ||
          item.age.toLowerCase().startsWith(value.toLowerCase()) ||
          item.salary.toLowerCase().startsWith(value.toLowerCase()) ||
          item.start_date.toLowerCase().startsWith(value.toLowerCase()) ||
          status[item.status].title.toLowerCase().startsWith(value.toLowerCase())

        const includes =
          item.full_name.toLowerCase().includes(value.toLowerCase()) ||
          item.post.toLowerCase().includes(value.toLowerCase()) ||
          item.email.toLowerCase().includes(value.toLowerCase()) ||
          item.age.toLowerCase().includes(value.toLowerCase()) ||
          item.salary.toLowerCase().includes(value.toLowerCase()) ||
          item.start_date.toLowerCase().includes(value.toLowerCase()) ||
          status[item.status].title.toLowerCase().includes(value.toLowerCase())

        if (startsWith) {
          return startsWith
        } else if (!startsWith && includes) {
          return includes
        } else return null
      })
      setFilteredData(updatedData)
      setSearchValue(value)
    }
  }

  // ** Function to handle Pagination
  const handlePagination = page => {
    setCurrentPage(page.selected)
  }

  // ** Custom Pagination
  const CustomPagination = () => (
    <ReactPaginate
      previousLabel=''
      nextLabel=''
      forcePage={currentPage}
      onPageChange={page => handlePagination(page)}
      pageCount={searchValue.length ? filteredData.length / 7 : data.length / 7 || 1}
      breakLabel='...'
      pageRangeDisplayed={2}
      marginPagesDisplayed={2}
      activeClassName='active'
      pageClassName='page-item'
      breakClassName='page-item'
      breakLinkClassName='page-link'
      nextLinkClassName='page-link'
      nextClassName='page-item next'
      previousClassName='page-item prev'
      previousLinkClassName='page-link'
      pageLinkClassName='page-link'
      breakClassName='page-item'
      breakLinkClassName='page-link'
      containerClassName='pagination react-paginate separated-pagination pagination-sm justify-content-end pr-1 mt-1'
    />
  )

  // ** Converts table to CSV
  function convertArrayOfObjectsToCSV(array) {
    let result

    const columnDelimiter = ','
    const lineDelimiter = '\n'
    const keys = Object.keys(data[0])

    result = ''
    result += keys.join(columnDelimiter)
    result += lineDelimiter

    array.forEach(item => {
      let ctr = 0
      keys.forEach(key => {
        if (ctr > 0) result += columnDelimiter

        result += item[key]

        ctr++
      })
      result += lineDelimiter
    })

    return result
  }

  // ** Downloads CSV
  function downloadCSV(array) {
    const link = document.createElement('a')
    let csv = convertArrayOfObjectsToCSV(array)
    if (csv === null) return

    const filename = 'export.csv'

    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`
    }

    link.setAttribute('href', encodeURI(csv))
    link.setAttribute('download', filename)
    link.click()
  }

  const userRoles = [
    { value: '1', label: 'System Admin', color: '#00B8D9', isFixed: true },
    { value: '2', label: 'Client', color: '#0052CC', isFixed: true },
    { value: '3', label: 'Crew', color: '#5243AA', isFixed: true }
  ]

  const users = [
    { value: '1', label: 'Stella Ganderton', color: '#00B8D9', isFixed: true },
    { value: '2', label: 'Harmonia Nisius', color: '#0052CC', isFixed: true },
    { value: '3', label: 'Genevra Honeywood', color: '#5243AA', isFixed: true }
  ]

  return (
    <Fragment>
      <Card>
        <CardHeader className='flex-md-row flex-column align-md-items-center align-items-start border-bottom'>
          <CardTitle tag='h4'>Presenter List</CardTitle>
          <div className='d-flex mt-md-0 mt-1'>
            
            <Button className='ml-2' color='primary' onClick={() => setShow(true)}>
              <Plus size={15} />
              <span className='align-middle ml-50'>Add Presenter</span>
            </Button>
            
          </div>
        </CardHeader>
        <Row className='justify-content-end mx-0'>
          <Col sm='6'>
            <div className='d-flex align-items-center mt-1 mb-1'>
              <Label for='sort-select'>show</Label>
              <Input
                className='dataTable-select'
                type='select'
                id='sort-select'
                value={rowsPerPage}
                onChange={e => handlePerPage(e)}
              >
                <option value={7}>7</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={75}>75</option>
                <option value={100}>100</option>
              </Input>
              {/* <Label for='sort-select'>entries</Label> */}
            </div>
          </Col>
          <Col className='d-flex align-items-center justify-content-end mt-1' md='6' sm='12'>
            <Label className='mr-1' for='search-input'>
              Search
            </Label>
            <Input
              className='dataTable-filter mb-50'
              type='text'
              bsSize='sm'
              id='search-input'
              value={searchValue}
              onChange={handleFilter}
            />
          </Col>
        </Row>
        <DataTable
          noHeader
          pagination
          // selectableRows
          columns={columns}
          paginationPerPage={7}
          className='react-dataTable'
          sortIcon={<ChevronDown size={10} />}
          paginationDefaultPage={currentPage + 1}
          paginationComponent={CustomPagination}
          data={searchValue.length ? filteredData : data}
          // selectableRowsComponent={BootstrapCheckbox}
        />
      </Card>
      <AddNewPresenterModal show={show} setShow={setShow}></AddNewPresenterModal>
      <EditPresenterModal show={editShow} setShow={setEditShow}></EditPresenterModal>
      
     
      {/* <AddNewModal open={modal} handleModal={handleModal} /> */}
    </Fragment>
  )
}

export default DataTableWithButtons
