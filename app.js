'use strict';

(() => {
  const STORAGE_KEY = 'hoSoDiTheDataV1';
  const CLASSES = ['Truyền thuyết dân gian', 'Nhân vật hư cấu hiện đại', 'Thần thoại / văn học', 'Sinh vật huyền bí / đô thị', 'Tư liệu truyền miệng'];
  const REGIONS = ['Việt Nam', 'Bắc Mỹ', 'Mỹ Latinh', 'Châu Âu', 'Đông Á', 'Khác'];
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const nowIso = () => new Date().toISOString();
  const slugify = value => String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/đ/g, 'd').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 54);
  const esc = value => String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const validUrl = value => { try { const u = new URL(value); return u.protocol === 'https:'; } catch { return false; } };
  const validImage = value => /^assets\/[a-z0-9._-]+\.svg$/i.test(String(value || '')) || validUrl(value);

  const SEED_ENTITIES = [
    {
      id:'slender-man', name:'Slender Man', aliases:['Slenderman','The Operator'], classification:'Nhân vật hư cấu hiện đại', category:'Creepypasta / kinh dị mạng', region:'Bắc Mỹ', culture:'Văn hóa Internet Hoa Kỳ', origin:'Diễn đàn Something Awful, Hoa Kỳ (2009)', prevalence:5,
      summary:'Hình tượng cao gầy, mặc vest tối màu và thường không có khuôn mặt; nổi tiếng từ một dự án chỉnh sửa ảnh kinh dị trên Internet.',
      appearance:'Thường được minh họa với vóc dáng rất cao, tay chân dài, bộ vest đen và khuôn mặt trống trơn. Một số tác phẩm hậu kỳ thêm các chi dạng xúc tu sau lưng; chi tiết này không cố định trong mọi phiên bản.',
      abilities:'Trong các câu chuyện do cộng đồng sáng tác, nhân vật có thể dịch chuyển bất thường, gây mất phương hướng hoặc theo dõi con người. Đây là năng lực hư cấu thay đổi theo tác phẩm, không phải quan sát được xác minh.',
      habitat:'Rừng vắng, vùng ngoại ô, ảnh chụp cũ và các chuỗi video giả tài liệu trong văn hóa creepypasta.',
      stories:'Slender Man bắt đầu từ một thử thách tạo ảnh huyền bí trên diễn đàn Something Awful vào tháng 6 năm 2009, gắn với người dùng có bút danh Victor Surge. Cộng đồng mạng tiếp tục phát triển nhiều câu chuyện, trò chơi và web-series riêng, khiến hình tượng dần có nhiều dị bản.',
      limits:'Nguồn gốc sáng tạo trên Internet có thể truy dấu; các năng lực siêu nhiên trong truyền thuyết mạng là yếu tố hư cấu. Không có bằng chứng đáng tin cậy cho thấy thực thể tồn tại ngoài đời.',
      tags:['creepypasta','Internet','rừng','vest đen','hư cấu'], image:'assets/slender-man.svg', imageAlt:'Minh họa nguyên bản một bóng người cao gầy giữa rừng tối.',
      sources:[{title:'Know Your Meme — Slender Man',url:'https://knowyourmeme.com/memes/slender-man',note:'Tổng hợp lịch sử meme và nguồn gốc nhân vật; nguồn tư liệu về văn hóa Internet.'},{title:'SBS News — How Slender Man became a legend',url:'https://www.sbs.com.au/news/article/how-slender-man-became-a-legend/i4j0moy09',note:'Bài viết báo chí tóm lược quá trình hình thành và lan truyền nhân vật.'}], createdAt:'2026-10-29T00:00:00.000Z', updatedAt:'2026-10-29T00:00:00.000Z', builtIn:true
    },
    {
      id:'siren-head', name:'Siren Head', aliases:['Đầu Còi'], classification:'Nhân vật hư cấu hiện đại', category:'Quái vật Internet', region:'Bắc Mỹ', culture:'Văn hóa Internet / kinh dị độc lập', origin:'Tác phẩm của nghệ sĩ Trevor Henderson (2018)', prevalence:5,
      summary:'Sinh vật hình người khổng lồ với cụm loa/còi thay cho đầu, được biết đến qua tranh kỹ thuật số và trò chơi kinh dị độc lập.',
      appearance:'Dáng cao khẳng khiu, bề mặt gợi thân cây khô; đầu là các loa hoặc còi kim loại. Các phiên bản do người hâm mộ tạo ra có thể khác đáng kể so với minh họa gốc.',
      abilities:'Trong phần mô tả hư cấu, nó phát tiếng còi, phát thanh hoặc giọng nói bị bóp méo để dụ hoặc làm hoảng sợ người nghe. Năng lực cụ thể tùy phiên bản cộng đồng.',
      habitat:'Rừng, đường quê, khu vực bỏ hoang và bối cảnh giả tư liệu kiểu VHS.',
      stories:'Siren Head là nhân vật do nghệ sĩ/nhà minh họa Trevor Henderson sáng tạo năm 2018. Thiết kế tận dụng cảm giác bất an từ các âm thanh phát thanh bí ẩn và thẩm mỹ found-footage; sau đó nhân vật lan rộng qua trò chơi và video do người hâm mộ làm.',
      limits:'Đây là nhân vật hư cấu đương đại. Tranh, video và trò chơi do người hâm mộ tạo ra không phải bằng chứng về một sinh vật có thật.',
      tags:['Trevor Henderson','âm thanh','rừng','found footage','hư cấu'], image:'assets/siren-head.svg', imageAlt:'Minh họa nguyên bản một thực thể cao với loa ở phần đầu.',
      sources:[{title:'Reactor — Artist Trevor Henderson on Siren Head',url:'https://reactormag.com/artist-trevor-henderson-siren-head-interview/',note:'Phỏng vấn nghệ sĩ về quá trình sáng tạo nhân vật và ý tưởng ban đầu.'},{title:'NOW Toronto — Siren Head: Toronto artist’s monster',url:'https://nowtoronto.com/culture/siren-head-game/',note:'Bài báo phỏng vấn Trevor Henderson về hình tượng và độ phổ biến của nhân vật.'}], createdAt:'2026-10-29T00:00:00.000Z', updatedAt:'2026-10-29T00:00:00.000Z', builtIn:true
    },
    {
      id:'wendigo', name:'Wendigo / Windigo', aliases:['Wiindigoo','Wetiko'], classification:'Truyền thuyết dân gian', category:'Thực thể trong truyền thống bản địa', region:'Bắc Mỹ', culture:'Truyền thống Algonquian (nhiều cộng đồng)', origin:'Truyền thống kể chuyện của một số cộng đồng Algonquian, gồm Ojibwe và Cree', prevalence:5,
      summary:'Một thực thể/ý niệm trong các truyền thống bản địa Bắc Mỹ, thường gắn với cái đói vô độ, sự tham lam, mùa đông và việc ăn thịt người.',
      appearance:'Mô tả thay đổi theo cộng đồng và tư liệu. Hình tượng đại chúng hiện đại thường vẽ nó gầy trơ xương, có sừng hoặc đầu hươu; chi tiết sừng không phải mô tả thống nhất của mọi truyền thống.',
      abilities:'Trong các câu chuyện, Windigo có thể tượng trưng cho sự đói khát, lòng tham hoặc sự biến đổi con người. Những mô-típ quái vật khổng lồ, sức mạnh phi thường hay cơ thể băng giá khác nhau theo nguồn kể và chuyển thể.',
      habitat:'Các câu chuyện thường gắn với mùa đông, vùng rừng phương bắc và tình huống đói khát hoặc cô lập; đây là bối cảnh biểu tượng trong truyền thống kể chuyện.',
      stories:'Windigo có ý nghĩa văn hóa và đạo đức phức tạp trong nhiều cộng đồng Algonquian. Các nghiên cứu học thuật lưu ý không nên đồng nhất toàn bộ truyền thống bản địa với hình tượng quái vật trong phim kinh dị hiện đại, vốn thường giản lược hoặc biến đổi chất liệu văn hóa.',
      limits:'Đây là hồ sơ về truyền thống văn hóa và cách kể chuyện, không phải xác nhận sự tồn tại vật lý của sinh vật. Cần tôn trọng khác biệt giữa cộng đồng, ngôn ngữ và cách diễn giải; không coi một phiên bản đại chúng là đại diện cho tất cả.',
      tags:['Algonquian','Ojibwe','Cree','mùa đông','đói khát','truyền thống bản địa'], image:'assets/wendigo.svg', imageAlt:'Minh họa nguyên bản một bóng dáng gầy giữa rừng lạnh; không đại diện cho mọi mô tả bản địa.',
      sources:[{title:'Journal of Religion & Film — Classroom Cannibal: The Windigo',url:'https://digitalcommons.unomaha.edu/jrf/vol22/iss1/36/',note:'Bài học thuật về Windigo trong tư tưởng và truyền thống Ojibwe, đồng thời bàn về các cách thể hiện trong phim.'},{title:'MDPI — Windigo Violence and Resistance',url:'https://www.mdpi.com/2313-5778/8/2/50',note:'Bài nghiên cứu thảo luận các cách viết, diễn giải và bối cảnh văn hóa của Windigo.'}], createdAt:'2026-10-29T00:00:00.000Z', updatedAt:'2026-10-29T00:00:00.000Z', builtIn:true
    },
    {
      id:'mothman', name:'Mothman', aliases:['Người Bướm','Sinh vật Point Pleasant'], classification:'Sinh vật huyền bí / đô thị', category:'Cryptid / truyền thuyết đô thị', region:'Bắc Mỹ', culture:'Folklore địa phương Hoa Kỳ', origin:'Các lời kể về việc nhìn thấy tại Point Pleasant, West Virginia (1966–1967)', prevalence:4,
      summary:'Sinh vật được các lời kể mô tả có dáng người, đôi cánh lớn và đôi mắt đỏ phát sáng; trở thành truyền thuyết đô thị nổi tiếng của West Virginia.',
      appearance:'Các lời kể phổ biến mô tả một hình thể giống chim hoặc người có cánh, cao lớn và mắt đỏ phản quang. Mô tả trong báo chí, sách và chuyển thể không hoàn toàn đồng nhất.',
      abilities:'Trong truyền thuyết, Mothman có thể bay hoặc lượn và xuất hiện bất ngờ. Một số câu chuyện gắn nó với điềm báo tai họa, nhưng mối liên hệ đó là diễn giải văn hóa chứ không phải kết luận khoa học.',
      habitat:'Vùng Point Pleasant và khu vực quanh các công trình công nghiệp/đường quê trong những lời kể đầu tiên; về sau xuất hiện trong sách, phim và văn hóa đại chúng.',
      stories:'Các báo cáo địa phương về một sinh vật có cánh bắt đầu được nhắc đến vào tháng 11 năm 1966. Truyền thuyết phát triển mạnh sau các câu chuyện liên hệ nó với vụ sập cầu Silver Bridge năm 1967. Các mối liên hệ nhân quả này không được xác lập bằng chứng.',
      limits:'Có tư liệu báo chí và nghiên cứu văn hóa về việc người dân kể lại trải nghiệm, nhưng chưa có bằng chứng khoa học thuyết phục xác nhận Mothman là một loài sinh vật chưa biết. Lời kể về hiện tượng không đồng nghĩa với xác minh danh tính sinh vật.',
      tags:['Point Pleasant','West Virginia','cánh','mắt đỏ','truyền thuyết đô thị'], image:'assets/mothman.svg', imageAlt:'Minh họa nguyên bản sinh vật có cánh với đôi mắt đỏ trong màn sương.',
      sources:[{title:'Smithsonian Folklife — Mothman of Point Pleasant',url:'https://folklife.si.edu/magazine/mothman-point-pleasant-west-virginia',note:'Bài viết văn hóa dân gian về các lời kể, vai trò địa phương và sự lan truyền của truyền thuyết.'},{title:'USC Digital Folklore Archives — Mothman',url:'https://folklore.usc.edu/mothman-urban-legend/',note:'Hồ sơ lưu trữ folklore, ghi lại nội dung lời kể và giới hạn chứng cứ.'}], createdAt:'2026-10-29T00:00:00.000Z', updatedAt:'2026-10-29T00:00:00.000Z', builtIn:true
    },
    {
      id:'cthulhu', name:'Cthulhu', aliases:['Cthulhu Mythos'], classification:'Thần thoại / văn học', category:'Kinh dị vũ trụ', region:'Bắc Mỹ', culture:'Văn học kinh dị Mỹ thế kỷ XX', origin:'Nhân vật trong truyện của H. P. Lovecraft; xuất hiện nổi bật trong “The Call of Cthulhu” (1928)', prevalence:5,
      summary:'Thực thể hư cấu ngoài vũ trụ trong văn học kinh dị vũ trụ, tượng trưng cho sự nhỏ bé và bất lực của con người trước điều không thể hiểu.',
      appearance:'Thường được hình dung với đầu có xúc tu, cơ thể khổng lồ gợi hình người và các đặc trưng giống sinh vật biển. Mô tả phổ biến chịu ảnh hưởng mạnh từ minh họa và chuyển thể về sau.',
      abilities:'Trong hệ thống hư cấu, Cthulhu có quy mô và sức mạnh vượt xa con người, gắn với giấc mơ, giáo phái bí mật và sự thức tỉnh của các thực thể cổ xưa. Đây là yếu tố văn học.',
      habitat:'Thành phố chìm R’lyeh trong hư cấu Lovecraft; không phải một địa điểm địa lý được xác minh.',
      stories:'Truyện “The Call of Cthulhu” được viết năm 1926 và xuất bản lần đầu trên tạp chí Weird Tales vào tháng 2 năm 1928. Tác phẩm ghép các tài liệu và lời kể để tạo cảm giác điều tra về một thực thể cổ đại; nó trở thành hạt nhân của Cthulhu Mythos và ảnh hưởng đến nhiều tác phẩm sau này.',
      limits:'Cthulhu là nhân vật văn học hư cấu. Có thể kiểm chứng lịch sử xuất bản của tác phẩm, nhưng các sự kiện siêu nhiên trong truyện không phải tư liệu lịch sử.',
      tags:['H. P. Lovecraft','cosmic horror','R’lyeh','văn học','1928'], image:'assets/cthulhu.svg', imageAlt:'Minh họa nguyên bản một thực thể khổng lồ gợi hình sinh vật biển giữa đại dương tối.',
      sources:[{title:'H. P. Lovecraft — The Call of Cthulhu (publication data)',url:'https://www.hplovecraft.com/writings/fiction/cc.aspx',note:'Trang tư liệu về truyện và lịch sử xuất bản.'},{title:'Project Gutenberg Australia — The Call of Cthulhu',url:'https://gutenberg.net.au/ebooks15/1500401h.html',note:'Toàn văn tác phẩm và thông tin xuất bản lần đầu năm 1928.'}], createdAt:'2026-10-29T00:00:00.000Z', updatedAt:'2026-10-29T00:00:00.000Z', builtIn:true
    },
    {
      id:'ma-da', name:'Ma Da', aliases:['Ma nước (một số cách gọi dân gian)'], classification:'Truyền thuyết dân gian', category:'Truyện kể dân gian Việt Nam', region:'Việt Nam', culture:'Dân gian Việt Nam', origin:'Các lời kể truyền miệng ở một số địa phương, thường gắn với sông, ao, hồ hoặc nơi nước sâu', prevalence:4,
      summary:'Hình tượng ma nước trong lời kể dân gian Việt Nam; một số dị bản nói rằng Ma Da kéo người xuống nước hoặc gắn với những nơi từng xảy ra tai nạn đuối nước.',
      appearance:'Không có mô tả thống nhất. Trong kể chuyện và hình ảnh hiện đại, Ma Da thường được minh họa như bóng người ướt sũng hoặc một bóng đen dưới mặt nước; đây là hình tượng minh họa, không phải đặc điểm được xác minh.',
      abilities:'Một số lời kể gán cho Ma Da khả năng níu kéo người xuống nước hoặc làm người đi qua bờ sông hoảng sợ. Đây là mô-típ truyền miệng; không có bằng chứng khoa học cho năng lực siêu nhiên.',
      habitat:'Bờ sông, ao hồ, kênh rạch, bến nước hoặc vùng nước sâu trong một số câu chuyện địa phương.',
      stories:'Hình tượng Ma Da thường được nhắc trong lời kể truyền miệng, truyện kể gia đình và nội dung đại chúng về những nơi nguy hiểm gần sông nước. Dị bản, tên gọi và chi tiết có thể khác nhau theo địa phương; cần ghi nhận xuất xứ cụ thể khi bổ sung một phiên bản.',
      limits:'Trong bộ dữ liệu mẫu này chưa có nguồn học thuật hoặc tư liệu điền dã độc lập đủ mạnh để xác nhận một dị bản cụ thể. Hồ sơ chỉ ghi nhận mô-típ dân gian phổ biến; không khẳng định ma quỷ tồn tại hay gây tai nạn thật. Không dùng truyền thuyết thay cho cảnh báo an toàn dưới nước.',
      tags:['Việt Nam','sông nước','truyền miệng','ma nước','dị bản địa phương'], image:'assets/ma-da.svg', imageAlt:'Minh họa nguyên bản bóng người mờ dưới mặt nước; không phải hình ảnh ghi nhận thực tế.',
      sources:[], createdAt:'2026-10-29T00:00:00.000Z', updatedAt:'2026-10-29T00:00:00.000Z', builtIn:true
    },
    {
      id:'quy-nhap-trang', name:'Quỷ Nhập Tràng', aliases:['Nhập tràng','Xác chết sống dậy (mô-típ dân gian)'], classification:'Tư liệu truyền miệng', category:'Giai thoại tâm linh Việt Nam', region:'Việt Nam', culture:'Dân gian Việt Nam', origin:'Các giai thoại dân gian Việt Nam; cách kể thay đổi theo vùng và văn bản hiện đại', prevalence:4,
      summary:'Tên gọi trong một số giai thoại dân gian về người chết hoặc thi thể có hành vi bất thường; chủ đề được tái hiện nhiều trong truyện kể và phim kinh dị Việt Nam.',
      appearance:'Không có bộ đặc điểm hình thể thống nhất. Trong các phiên bản hư cấu, hình tượng có thể được thể hiện qua thi thể bất động rồi chuyển động hoặc người chết bị một thế lực chi phối.',
      abilities:'Các câu chuyện gán cho hiện tượng hành vi kỳ lạ của thi thể hoặc sự xâm nhập của một thế lực siêu nhiên. Chi tiết này là niềm tin/mô-típ kể chuyện, không phải hiện tượng được y học hay khoa học xác nhận theo nghĩa siêu nhiên.',
      habitat:'Thường xuất hiện trong bối cảnh gia đình có tang, nhà xác hoặc không gian làng quê trong các chuyện kể và phim ảnh; bối cảnh thay đổi theo tác phẩm.',
      stories:'“Quỷ nhập tràng” được khai thác trong một số giai thoại dân gian và tác phẩm kinh dị đương đại. Cần tách biệt các dị bản truyền miệng khỏi kịch bản điện ảnh, vốn có thể thêm tình tiết để phục vụ câu chuyện.',
      limits:'Hồ sơ hiện chưa có trích dẫn học thuật hoặc bản ghi điền dã đủ để xác lập nguồn gốc chính xác của từng dị bản. Nguồn báo chí về việc phim ảnh khai thác chất liệu dân gian chỉ chứng minh sự hiện diện của đề tài trong văn hóa đại chúng, không chứng minh hiện tượng siêu nhiên.',
      tags:['Việt Nam','thi thể','giai thoại','phim kinh dị','dị bản'], image:'assets/quy-nhap-trang.svg', imageAlt:'Minh họa nguyên bản hành lang tối với bóng dáng mờ; không mô tả sự kiện có thật.',
      sources:[{title:'Báo Quốc tế — Khai mở kho báu dân gian của điện ảnh Việt Nam',url:'https://baoquocte.vn/khai-mo-kho-bau-dan-gian-cua-dien-anh-viet-nam-432705.html',note:'Bài báo nói về việc điện ảnh khai thác chất liệu dân gian, trong đó có Quỷ nhập tràng; không phải nguồn xác minh hiện tượng siêu nhiên.'}], createdAt:'2026-10-29T00:00:00.000Z', updatedAt:'2026-10-29T00:00:00.000Z', builtIn:true
    },
    {
      id:'baba-yaga', name:'Baba Yaga', aliases:['Baba Jaga'], classification:'Truyền thuyết dân gian', category:'Truyện kể dân gian Slav', region:'Châu Âu', culture:'Truyền thống kể chuyện Slav', origin:'Truyền thống truyện kể của các cộng đồng Slav ở Đông Âu', prevalence:4,
      summary:'Nhân vật phù thủy kỳ dị trong nhiều truyện dân gian Slav; có lúc là kẻ đe dọa, có lúc thử thách hoặc giúp nhân vật chính.',
      appearance:'Thường được minh họa là một bà lão đáng sợ sống ở nơi hẻo lánh, gắn với căn nhà kỳ lạ trong rừng. Các yếu tố như cối bay hay chân gà của căn nhà phụ thuộc từng dị bản.',
      abilities:'Trong truyện, Baba Yaga có thể dùng phép thuật, đặt thử thách hoặc trao vật phẩm giúp nhân vật. Vai trò của bà không hoàn toàn là phản diện; truyện kể khác nhau có cách xây dựng khác nhau.',
      habitat:'Ngôi nhà biệt lập trong rừng hoặc rìa thế giới con người của các truyện dân gian Slav.',
      stories:'Baba Yaga xuất hiện trong nhiều dị bản truyện dân gian Đông Âu và thường có chức năng thử lòng, kiểm tra sự khôn ngoan hoặc đại diện cho ranh giới nguy hiểm giữa cộng đồng và vùng hoang dã.',
      limits:'Đây là nhân vật folklore với nhiều dị bản, không phải nhân vật lịch sử. Không nên gộp tất cả chi tiết từ sách thiếu nhi, trò chơi và phim vào một bản kể duy nhất.',
      tags:['Slav','Đông Âu','phù thủy','rừng','truyện cổ'], image:'assets/baba-yaga.svg', imageAlt:'Minh họa nguyên bản ngôi nhà kỳ dị giữa rừng đêm gợi truyền thuyết Baba Yaga.',
      sources:[{title:'Project Gutenberg — Russian Fairy Tales, W. R. S. Ralston',url:'https://www.gutenberg.org/cache/epub/22373/pg22373-images.html',note:'Tuyển tập truyện dân gian Nga có chương riêng về Baba Yaga; là nguồn văn bản lịch sử, cần lưu ý cách biên tập và bối cảnh xuất bản.'}], createdAt:'2026-10-29T00:00:00.000Z', updatedAt:'2026-10-29T00:00:00.000Z', builtIn:true
    },
    {
      id:'la-llorona', name:'La Llorona', aliases:['Người đàn bà khóc','The Weeping Woman'], classification:'Truyền thuyết dân gian', category:'Truyền thuyết Mỹ Latinh', region:'Mỹ Latinh', culture:'Folklore Mexico và Mỹ Latinh', origin:'Truyện kể dân gian Mexico và nhiều vùng Mỹ Latinh; có nhiều phiên bản', prevalence:4,
      summary:'Truyền thuyết về người phụ nữ than khóc, thường được kể là xuất hiện gần nguồn nước và tìm kiếm những đứa con đã mất.',
      appearance:'Thường được kể hoặc minh họa như một phụ nữ mặc đồ trắng, gương mặt đau khổ, xuất hiện trong đêm gần sông hoặc kênh rạch. Chi tiết thay đổi giữa các vùng.',
      abilities:'Trong các dị bản, tiếng khóc của bà là dấu hiệu báo trước hoặc khiến người nghe sợ hãi. Một số bản kể gắn bà với việc tìm trẻ em; đây là mô-típ trong truyền thuyết, không phải báo cáo đã xác minh.',
      habitat:'Bờ sông, kênh, hồ và các tuyến đường vắng vào ban đêm trong các câu chuyện dân gian.',
      stories:'La Llorona là một truyền thuyết có nhiều phiên bản, được lưu truyền qua kể chuyện, sân khấu, văn học và điện ảnh. Nguồn gốc và mối liên hệ với các nhân vật lịch sử hoặc truyền thống bản địa được diễn giải khác nhau, nên cần thận trọng với một lời giải thích duy nhất.',
      limits:'Nội dung hồ sơ mô tả truyền thuyết và các biến thể, không xác nhận sự tồn tại của hồn ma hay sự kiện siêu nhiên.',
      tags:['Mexico','Mỹ Latinh','tiếng khóc','sông nước','truyền thuyết'], image:'assets/la-llorona.svg', imageAlt:'Minh họa nguyên bản dáng người mặc áo trắng bên bờ sông mù sương.',
      sources:[{title:'Revista Chilena de Literatura — La Llorona, la Ciguanaba y otros espectros femeninos',url:'https://www.revistaliteratura.uchile.cl/index.php/RCL/article/view/65817',note:'Bài nghiên cứu học thuật so sánh lời kể truyền miệng và mô-típ folklore của La Llorona cùng các hình tượng liên quan.'}], createdAt:'2026-10-29T00:00:00.000Z', updatedAt:'2026-10-29T00:00:00.000Z', builtIn:true
    },
    {
      id:'chupacabra', name:'Chupacabra', aliases:['Goat-sucker'], classification:'Sinh vật huyền bí / đô thị', category:'Cryptid / truyền thuyết đương đại', region:'Mỹ Latinh', culture:'Folklore đô thị Puerto Rico và Mỹ Latinh', origin:'Các báo cáo và lời kể tại Puerto Rico từ thập niên 1990; sau đó lan sang châu Mỹ', prevalence:4,
      summary:'Sinh vật trong truyền thuyết đương đại thường bị cho là tấn công gia súc; mô tả khác nhau giữa phiên bản Puerto Rico và những báo cáo về sau.',
      appearance:'Hình tượng đầu tiên thường được kể là sinh vật đi bằng hai chân, có gai dọc lưng; về sau tên gọi cũng gắn với những con vật bốn chân trông giống chó sói hoặc chó ghẻ. Các mô tả không thống nhất.',
      abilities:'Truyền thuyết cho rằng nó hút máu hoặc tấn công dê và gia súc. Một số trường hợp về sau được giải thích là động vật mắc bệnh ghẻ hoặc bị nhận dạng nhầm, nhưng mọi lời kể riêng cần được xem xét theo bằng chứng cụ thể.',
      habitat:'Các cộng đồng nông thôn và vùng chăn nuôi trong những lời kể ở Puerto Rico, Mexico và nhiều nơi khác tại châu Mỹ.',
      stories:'Tên Chupacabra xuất hiện trong truyền thông Puerto Rico vào thập niên 1990 sau các báo cáo về gia súc chết. Hình dáng sinh vật thay đổi theo thời gian và địa điểm, cho thấy câu chuyện phát triển qua báo chí, lời kể và văn hóa đại chúng.',
      limits:'Chưa có bằng chứng khoa học đáng tin cậy xác nhận Chupacabra là một loài chưa biết. Nên phân biệt báo cáo về gia súc chết với kết luận rằng nguyên nhân là một sinh vật siêu nhiên.',
      tags:['Puerto Rico','gia súc','cryptid','1990s','truyền thuyết đô thị'], image:'assets/chupacabra.svg', imageAlt:'Minh họa nguyên bản sinh vật tưởng tượng trong khung cảnh hoang vắng.',
      sources:[{title:'American Museum of Natural History — Chupacabra',url:'https://www.amnh.org/explore/ology/ology-cards/281-chupacabra',note:'Tư liệu giáo dục của bảo tàng về truyền thuyết hiện đại, các mô tả và khả năng nhầm lẫn với động vật mắc bệnh.'}], createdAt:'2026-10-29T00:00:00.000Z', updatedAt:'2026-10-29T00:00:00.000Z', builtIn:true
    }
  ];

  function initialState() {
    const defaults = {schemaVersion:1, entities:SEED_ENTITIES.map(e => ({...e})), favorites:[], history:[], compareIds:[], settings:{sort:'popular',classification:'',region:'',culture:'',category:'',query:''}};
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) { localStorage.setItem(STORAGE_KEY, JSON.stringify(defaults)); return defaults; }
      const parsed = JSON.parse(raw);
      if (!parsed || !Array.isArray(parsed.entities)) throw new Error('Cấu trúc lưu trữ không hợp lệ');
      return {
        schemaVersion:1,
        entities:parsed.entities.filter(isEntityShape).map(normalizeEntity),
        favorites:Array.isArray(parsed.favorites)?parsed.favorites.filter(v=>typeof v==='string'):[],
        history:Array.isArray(parsed.history)?parsed.history.filter(v=>typeof v==='string').slice(0,40):[],
        compareIds:Array.isArray(parsed.compareIds)?parsed.compareIds.filter(v=>typeof v==='string'):[],
        settings:{...defaults.settings,...(parsed.settings && typeof parsed.settings==='object'?parsed.settings:{})}
      };
    } catch (error) {
      return defaults;
    }
  }
  function isEntityShape(e) { return e && typeof e==='object' && typeof e.id==='string' && typeof e.name==='string'; }
  function normalizeEntity(e) {
    return {
      id:String(e.id), name:String(e.name||''), aliases:Array.isArray(e.aliases)?e.aliases.map(String):[], classification:String(e.classification||'Tư liệu truyền miệng'), category:String(e.category||''), region:String(e.region||'Khác'), culture:String(e.culture||'Chưa xác định'), origin:String(e.origin||''), prevalence:Math.min(5,Math.max(1,Number(e.prevalence)||3)), summary:String(e.summary||''), appearance:String(e.appearance||''), abilities:String(e.abilities||''), habitat:String(e.habitat||''), stories:String(e.stories||''), limits:String(e.limits||''), tags:Array.isArray(e.tags)?e.tags.map(String):[], image:validImage(e.image)?String(e.image):'assets/slender-man.svg', imageAlt:String(e.imageAlt||'Hình minh họa thực thể'), sources:Array.isArray(e.sources)?e.sources.filter(s=>s&&typeof s.title==='string'&&validUrl(s.url)).map(s=>({title:String(s.title),url:String(s.url),note:String(s.note||'')})):[], createdAt:String(e.createdAt||nowIso()), updatedAt:String(e.updatedAt||nowIso()), builtIn:!!e.builtIn
    };
  }
  let state = initialState();
  let view = {query:'',classification:'',region:'',culture:'',sort:'popular',activeTab:'overview'};
  let lastRecordedRoute = '';
  let toastCounter = 0;
  const main = $('#mainContent');

  function saveState() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); return true; }
    catch (e) { toast('Không thể lưu trên thiết bị', 'Bộ nhớ trình duyệt có thể đã đầy hoặc bị chặn. Hãy xuất JSON để sao lưu.', 'error'); return false; }
  }
  function toast(title, message='', kind='success') {
    const region = $('#toastRegion'); const id = ++toastCounter;
    const item = document.createElement('div'); item.className = `toast ${kind}`; item.dataset.toastId = String(id);
    item.innerHTML = `<span class="toast-icon">${kind==='error'?'!':'✓'}</span><div><strong>${esc(title)}</strong><p>${esc(message)}</p></div>`;
    region.appendChild(item); setTimeout(()=>item.remove(), 4200);
  }
  function currentHash() { return location.hash || '#/'; }
  function parseRoute() {
    const parts = currentHash().replace(/^#\/?/, '').split('/').filter(Boolean).map(decodeURIComponent);
    if (!parts.length || parts[0]==='library') return {page:'home'};
    if (parts[0]==='entity' && parts[1]) return {page:'entity',id:parts[1]};
    if (['favorites','history','compare','contribute'].includes(parts[0])) return {page:parts[0]};
    if (parts[0]==='edit' && parts[1]) return {page:'edit',id:parts[1]};
    return {page:'notfound'};
  }
  function navigate(hash) { if (currentHash()===hash) render(); else location.hash=hash; }
  function getEntity(id) { return state.entities.find(e=>e.id===id); }
  function allExisting(ids) { return ids.map(getEntity).filter(Boolean); }
  function classTone(classification) {
    if (classification==='Nhân vật hư cấu hiện đại') return 'violet';
    if (classification==='Thần thoại / văn học') return 'gold';
    if (classification==='Sinh vật huyền bí / đô thị') return 'blue';
    if (classification==='Tư liệu truyền miệng') return 'grey';
    return '';
  }
  function classShort(s) {
    const map={'Nhân vật hư cấu hiện đại':'Hư cấu hiện đại','Thần thoại / văn học':'Thần thoại / văn học','Sinh vật huyền bí / đô thị':'Sinh vật huyền bí','Truyền thuyết dân gian':'Truyền thuyết dân gian','Tư liệu truyền miệng':'Tư liệu truyền miệng'};
    return map[s]||s;
  }
  function badge(e) { return `<span class="type-badge ${classTone(e.classification)}">${esc(classShort(e.classification))}</span>`; }
  function ratingBars(value) { return `<span class="rating-bars" aria-label="Mức độ phổ biến ${value} trên 5">${[1,2,3,4,5].map(n=>`<i class="${n<=value?'on':''}"></i>`).join('')}</span><span class="rating-label">${value}/5</span>`; }
  function cardTemplate(e) {
    const fav=state.favorites.includes(e.id); const compared=state.compareIds.includes(e.id);
    return `<article class="entity-card" data-entity-card="${esc(e.id)}">
      <div class="card-image-wrap">
        <img class="card-image" src="${esc(e.image)}" alt="${esc(e.imageAlt)}" loading="lazy" onerror="this.onerror=null;this.src='assets/slender-man.svg'">
        <span class="image-code">HS-${esc(e.id.toUpperCase().slice(0,7))}</span>
        <div class="card-actions"><button class="mini-action ${fav?'favorited':''}" data-action="favorite" data-id="${esc(e.id)}" aria-label="${fav?'Bỏ yêu thích':'Thêm vào yêu thích'}" title="${fav?'Bỏ yêu thích':'Thêm vào yêu thích'}">${fav?'♥':'♡'}</button><button class="mini-action" data-action="detail" data-id="${esc(e.id)}" aria-label="Mở hồ sơ" title="Mở hồ sơ">↗</button></div>
        <label class="compare-select" title="Chọn để so sánh"><input type="checkbox" data-action="compare-toggle" data-id="${esc(e.id)}" ${compared?'checked':''} aria-label="Chọn ${esc(e.name)} để so sánh"> Đối chiếu</label>
      </div>
      <div class="card-body"><div class="card-tags">${badge(e)}</div><h3><a href="#/entity/${encodeURIComponent(e.id)}">${esc(e.name)}</a></h3><div class="card-alias">${esc(e.aliases.slice(0,2).join(' · ')||e.category)}</div><p class="card-summary">${esc(e.summary)}</p><div class="card-foot"><span class="card-region"><span>⌖</span>${esc(e.region)}</span><span class="card-arrow">↗</span></div></div>
    </article>`;
  }
  function searchHaystack(e) { return [e.name,...e.aliases,e.classification,e.category,e.region,e.culture,e.origin,e.summary,e.appearance,e.abilities,e.habitat,e.stories,...e.tags].join(' ').toLocaleLowerCase('vi'); }
  function filteredEntities(mode='home') {
    let list = [...state.entities];
    if (mode==='favorites') list=list.filter(e=>state.favorites.includes(e.id));
    if (view.query.trim()) { const q=view.query.trim().toLocaleLowerCase('vi'); list=list.filter(e=>searchHaystack(e).includes(q)); }
    if (view.classification) list=list.filter(e=>e.classification===view.classification);
    if (view.region) list=list.filter(e=>e.region===view.region);
    if (view.culture) list=list.filter(e=>e.culture===view.culture);
    if (view.category) list=list.filter(e=>e.category===view.category);
    const sort=view.sort||'popular';
    if(sort==='popular') list.sort((a,b)=>b.prevalence-a.prevalence||a.name.localeCompare(b.name,'vi'));
    if(sort==='name') list.sort((a,b)=>a.name.localeCompare(b.name,'vi'));
    if(sort==='newest') list.sort((a,b)=>new Date(b.updatedAt)-new Date(a.updatedAt));
    if(sort==='oldest') list.sort((a,b)=>new Date(a.createdAt)-new Date(b.createdAt));
    return list;
  }
  function searchPanel(placeholder='Tìm tên, đặc điểm, nguồn gốc…') {
    return `<div class="hero-search"><label class="searchbox"><span class="search-icon">⌕</span><input id="entitySearch" type="search" autocomplete="off" value="${esc(view.query)}" placeholder="${esc(placeholder)}" aria-label="Tìm kiếm hồ sơ"><span class="search-shortcut">/</span></label><div class="search-caption"><span class="tiny-dot">●</span> Tìm theo tên, từ khóa, năng lực được kể lại, văn hóa, khu vực hoặc nguồn gốc</div></div>`;
  }
  function resultsGrid(mode='home', heading='Hồ sơ được lưu trữ') {
    const list=filteredEntities(mode);
    return `<div class="results-meta"><span id="resultsCount">Đang hiển thị <strong>${list.length}</strong> / ${state.entities.length} hồ sơ</span><span>${view.query?`Từ khóa: “${esc(view.query)}”`:'Hồ sơ được sắp xếp theo mức độ phổ biến'}</span></div>
      ${list.length?`<div class="entity-grid" id="resultsGrid">${list.map(cardTemplate).join('')}</div>`:`<div class="empty-state" id="emptyState"><div class="empty-icon">⌕</div><h3>${mode==='favorites'&&!state.favorites.length?'Chưa có hồ sơ yêu thích':'Không tìm thấy hồ sơ phù hợp'}</h3><p>${mode==='favorites'&&!state.favorites.length?'Hãy nhấn biểu tượng trái tim trên thẻ hồ sơ để lưu lại những thực thể bạn muốn khám phá sau.':'Thử một từ khóa khác hoặc xóa bớt bộ lọc. Ứng dụng chỉ tìm trong dữ liệu hiện có, không tạo kết quả giả.'}</p><button class="button button-secondary" data-action="reset-filters">Xóa bộ lọc</button></div>`}`;
  }
  function filterControls() {
    const classifications=[...new Set(state.entities.map(e=>e.classification))].sort((a,b)=>a.localeCompare(b,'vi'));
    const regions=[...new Set(state.entities.map(e=>e.region))].sort((a,b)=>a.localeCompare(b,'vi'));
    const categories=[...new Set(state.entities.map(e=>e.category).filter(Boolean))].sort((a,b)=>a.localeCompare(b,'vi'));
    const cultures=[...new Set(state.entities.map(e=>e.culture).filter(Boolean))].sort((a,b)=>a.localeCompare(b,'vi'));
    return `<div class="filter-bar"><label class="select-wrap"><select id="classFilter" aria-label="Lọc theo loại nguồn gốc"><option value="">Tất cả phân loại</option>${classifications.map(c=>`<option ${view.classification===c?'selected':''} value="${esc(c)}">${esc(classShort(c))}</option>`).join('')}</select></label><label class="select-wrap"><select id="regionFilter" aria-label="Lọc theo khu vực"><option value="">Mọi khu vực</option>${regions.map(r=>`<option ${view.region===r?'selected':''} value="${esc(r)}">${esc(r)}</option>`).join('')}</select></label><label class="select-wrap"><select id="categoryFilter" aria-label="Lọc theo thể loại"><option value="">Tất cả thể loại</option>${categories.map(c=>`<option ${view.category===c?'selected':''} value="${esc(c)}">${esc(c)}</option>`).join('')}</select></label><label class="select-wrap"><select id="cultureFilter" aria-label="Lọc theo văn hóa hoặc truyền thống"><option value="">Mọi văn hóa</option>${cultures.map(c=>`<option ${view.culture===c?'selected':''} value="${esc(c)}">${esc(c)}</option>`).join('')}</select></label><label class="select-wrap"><select id="sortFilter" aria-label="Sắp xếp"><option value="popular" ${view.sort==='popular'?'selected':''}>Phổ biến nhất</option><option value="name" ${view.sort==='name'?'selected':''}>Tên A–Z</option><option value="newest" ${view.sort==='newest'?'selected':''}>Cập nhật gần đây</option><option value="oldest" ${view.sort==='oldest'?'selected':''}>Cũ nhất</option></select></label><button class="filter-chip reset" data-action="reset-filters">↺ Đặt lại</button></div>`;
  }
  function homePage() {
    return `<section class="hero"><div class="hero-copy"><div class="eyebrow">HỆ THỐNG HỒ SƠ · 001—∞</div><h1>Những điều chưa gọi tên,<br><em>được lưu vào hồ sơ.</em></h1><p class="hero-description">Một kho lưu trữ dành cho những thực thể nằm giữa truyền thuyết, văn hóa đại chúng và điều chưa thể kiểm chứng. Khám phá câu chuyện — nhưng luôn nhìn rõ ranh giới giữa tư liệu và hư cấu.</p><div class="hero-stats"><div class="stat"><strong>${state.entities.length.toString().padStart(2,'0')}</strong><span>Hồ sơ lưu trữ</span></div><div class="stat"><strong>${new Set(state.entities.map(e=>e.region)).size.toString().padStart(2,'0')}</strong><span>Khu vực xuất xứ</span></div><div class="stat"><strong>${state.favorites.length.toString().padStart(2,'0')}</strong><span>Đã đánh dấu</span></div></div></div><div class="hero-art" aria-hidden="true"><div class="moon"></div><div class="hero-figure"><div class="head"></div><div class="body"></div><div class="arm left"></div><div class="arm right"></div><div class="mist"></div></div><span class="hero-coordinate">UNKNOWN / FIELD NOTES / 2026</span></div></section>
      ${searchPanel()}<div class="section-head"><div><div class="section-kicker">INDEX / 01</div><h2 class="section-title">${view.query||view.classification||view.region||view.category||view.culture?'Kết quả tra cứu':'Thư viện thực thể'}</h2><p class="section-subtitle">Mỗi hồ sơ là một câu chuyện có nguồn gốc và mức độ kiểm chứng riêng.</p></div><div class="toolbar"><a href="#/contribute" class="button button-primary button-small">＋ Thêm hồ sơ</a></div></div>
      ${filterControls()}<div id="resultsSection">${resultsGrid()}</div>
      <div class="home-bottom-grid"><div class="feature-panel"><div class="feature-emblem">⌘</div><div><h3>Đọc câu chuyện, kiểm tra nguồn gốc</h3><p>Hồ sơ phân tách truyền thống văn hóa, hư cấu hiện đại và lời kể chưa được kiểm chứng — không biến điều bí ẩn thành kết luận khoa học.</p></div></div><div class="method-panel"><div class="method-heading"><h3>Nguyên tắc lưu trữ</h3><span class="tiny-label">PROTOCOL 03</span></div><p>Ưu tiên nguồn có thể truy cập; ghi giới hạn kiểm chứng; giữ nguyên dị bản văn hóa; và dùng minh họa nguyên bản khi không có ảnh phù hợp về quyền sử dụng.</p></div></div>`;
  }
  function favoritesPage() {
    return `<div class="page-heading"><div><div class="eyebrow">PERSONAL INDEX / 02</div><h1>Hồ sơ yêu thích</h1><p>Những thực thể bạn đã đánh dấu được lưu trên trình duyệt này.</p></div><div class="heading-symbol">♡</div></div>${searchPanel('Tìm trong hồ sơ yêu thích…')}${filterControls()}<div id="resultsSection">${resultsGrid('favorites')}</div>`;
  }
  function historyPage() {
    const rows=state.history.map(id=>getEntity(id)).filter(Boolean);
    return `<div class="page-heading"><div><div class="eyebrow">RECENTLY OBSERVED / 03</div><h1>Lịch sử khám phá</h1><p>Các hồ sơ đã mở gần đây trên thiết bị này, theo thứ tự mới nhất.</p></div><div class="heading-symbol">◷</div></div>
      ${rows.length?`<div class="section-head"><div><h2 class="section-title">Dấu vết gần đây</h2><p class="section-subtitle">Tối đa 40 hồ sơ gần nhất được ghi lại cục bộ.</p></div><button class="button button-ghost button-small" data-action="clear-history">Xóa lịch sử</button></div>${rows.map(e=>`<div class="history-row"><img src="${esc(e.image)}" alt="${esc(e.imageAlt)}"><div class="history-row-main"><strong>${esc(e.name)}</strong><small>${esc(e.classification)} · ${esc(e.region)}</small></div><a class="button button-secondary button-small" href="#/entity/${encodeURIComponent(e.id)}">Mở hồ sơ ↗</a></div>`).join('')}`:`<div class="empty-state"><div class="empty-icon">◷</div><h3>Chưa có dấu vết nào</h3><p>Mở một hồ sơ trong thư viện để hồ sơ đó xuất hiện ở đây. Lịch sử không gửi dữ liệu ra ngoài thiết bị.</p><a href="#/" class="button button-primary">Khám phá thư viện</a></div>`}
      <div class="notice" style="margin-top:18px"><strong>Quyền riêng tư:</strong> Lịch sử được lưu trong localStorage của trình duyệt, không có tài khoản và không gửi lên máy chủ.</div>`;
  }
  function renderEntityDetail(id) {
    const e=getEntity(id);
    if(!e) return `<div class="route-error"><div class="eyebrow">RECORD NOT FOUND</div><h1>Hồ sơ không tồn tại</h1><p>Hồ sơ này có thể đã bị xóa hoặc không nằm trong dữ liệu được nhập.</p><a href="#/" class="button button-primary">Trở về thư viện</a></div>`;
    if(lastRecordedRoute!==`entity:${e.id}`) { state.history=[e.id,...state.history.filter(x=>x!==e.id)].slice(0,40); saveState(); lastRecordedRoute=`entity:${e.id}`; }
    const related=state.entities.filter(other=>other.id!==e.id&&(other.region===e.region||other.culture===e.culture||other.classification===e.classification)).slice(0,3);
    const fav=state.favorites.includes(e.id);
    return `<div class="detail-topline"><a class="back-link" href="#/">← Quay lại thư viện</a><span class="record-id">ARCHIVE ID / HS-${esc(e.id.toUpperCase())}</span></div>
      <section class="detail-hero"><div class="detail-art"><img src="${esc(e.image)}" alt="${esc(e.imageAlt)}" onerror="this.onerror=null;this.src='assets/slender-man.svg'"><div class="art-caption"><small>FIELD ILLUSTRATION · ${esc(e.region.toUpperCase())}</small><strong>${esc(e.name)}</strong></div></div><div class="detail-content"><div class="card-tags">${badge(e)}<span class="type-badge grey">${e.sources.length?'Có nguồn tham khảo':'Nguồn cần bổ sung'}</span></div><h1>${esc(e.name)}</h1><div class="detail-alias">${esc(e.aliases.join(' · ')||'Chưa ghi nhận tên gọi khác')}</div><p class="detail-summary">${esc(e.summary)}</p><div class="notice"><strong>Giới hạn kiểm chứng:</strong> ${esc(e.limits)}</div><div class="detail-actions"><button class="button ${fav?'button-secondary':'button-primary'}" data-action="favorite" data-id="${esc(e.id)}">${fav?'♥ Đã yêu thích':'♡ Lưu yêu thích'}</button><button class="button button-secondary" data-action="compare-toggle" data-id="${esc(e.id)}">${state.compareIds.includes(e.id)?'✓ Đã chọn đối chiếu':'⇄ Chọn đối chiếu'}</button><a class="button button-ghost" href="#/edit/${encodeURIComponent(e.id)}">✎ Chỉnh sửa</a><button class="button button-ghost" data-action="delete-entity" data-id="${esc(e.id)}">⌫ Xóa</button></div><div class="detail-metadata"><div class="metadata-cell"><span>Xuất xứ / bối cảnh</span><strong>${esc(e.origin)}</strong></div><div class="metadata-cell"><span>Khu vực địa lý</span><strong>${esc(e.region)}</strong></div><div class="metadata-cell"><span>Văn hóa / truyền thống</span><strong>${esc(e.culture)}</strong></div><div class="metadata-cell"><span>Nhóm phân loại</span><strong>${esc(e.category)}</strong></div><div class="metadata-cell"><span>Độ phổ biến trong văn hóa đại chúng</span><strong>${ratingBars(e.prevalence)}</strong></div></div></div></section>
      <div class="detail-tabs"><button class="detail-tab ${view.activeTab==='overview'?'active':''}" data-tab="overview">Hồ sơ tổng quan</button><button class="detail-tab ${view.activeTab==='story'?'active':''}" data-tab="story">Lịch sử & dị bản</button><button class="detail-tab ${view.activeTab==='sources'?'active':''}" data-tab="sources">Nguồn tham khảo (${e.sources.length})</button></div>
      <div class="detail-sections"><div>${view.activeTab==='story'?`<section class="record-section"><h3><span class="section-number">01</span> Lịch sử & câu chuyện liên quan</h3><p>${esc(e.stories)}</p></section><section class="record-section"><h3><span class="section-number">02</span> Giới hạn và lưu ý</h3><p>${esc(e.limits)}</p></section>`:view.activeTab==='sources'?`<section class="record-section"><h3><span class="section-number">01</span> Nguồn tham khảo</h3>${sourceList(e)}</section>`:`<section class="record-section"><h3><span class="section-number">01</span> Đặc điểm nhận dạng</h3><p>${esc(e.appearance)}</p></section><section class="record-section"><h3><span class="section-number">02</span> Năng lực được mô tả</h3><p>${esc(e.abilities)}</p></section><section class="record-section"><h3><span class="section-number">03</span> Môi trường xuất hiện</h3><p>${esc(e.habitat)}</p></section><section class="record-section"><h3><span class="section-number">04</span> Câu chuyện liên quan</h3><p>${esc(e.stories)}</p></section>`}</div><aside><section class="record-section"><h3><span class="section-number">A—Z</span> Từ khóa lưu trữ</h3><div class="tag-cloud">${e.tags.map(t=>`<span class="tag-pill">${esc(t)}</span>`).join('')}</div><p class="provenance-line">Ngày cập nhật hồ sơ: ${esc(formatDate(e.updatedAt))}</p></section><section class="record-section"><h3><span class="section-number">SRC</span> Tư liệu dẫn chiếu</h3>${sourceList(e)}</section></aside></div>
      ${related.length?`<div class="section-head"><div><div class="section-kicker">RELATED RECORDS</div><h2 class="section-title">Hồ sơ có liên hệ</h2></div></div><div class="related-strip">${related.map(r=>`<a class="related-item" href="#/entity/${encodeURIComponent(r.id)}"><img src="${esc(r.image)}" alt="${esc(r.imageAlt)}" loading="lazy"><span><strong>${esc(r.name)}</strong><small>${esc(r.region)} · ${esc(classShort(r.classification))}</small></span></a>`).join('')}</div>`:''}`;
  }
  function sourceList(e) {
    if(!e.sources.length) return `<div class="source-unavailable"><strong>Chưa có nguồn độc lập đủ mạnh trong bộ dữ liệu mẫu.</strong><br>Hồ sơ đang ghi nhận mô-típ truyền miệng, cần bổ sung tư liệu điền dã hoặc nghiên cứu văn hóa có thể kiểm tra. Không coi phần mô tả này là xác nhận sự kiện siêu nhiên.</div>`;
    return `<div class="sources-list">${e.sources.map(s=>`<div class="source-item"><a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.title)} ↗</a><p>${esc(s.note)}</p></div>`).join('')}</div>`;
  }
  function comparePage() {
    const entities=allExisting(state.compareIds);
    if(entities.length<2) return `<div class="page-heading"><div><div class="eyebrow">CROSS-REFERENCE / 04</div><h1>Bảng đối chiếu</h1><p>So sánh thông tin có cấu trúc giữa các hồ sơ đã chọn.</p></div><div class="heading-symbol">⇄</div></div><div class="empty-state compare-empty"><div class="empty-icon">⇄</div><h3>Cần ít nhất hai hồ sơ</h3><p>Quay lại thư viện và đánh dấu “Đối chiếu” ở hai hoặc nhiều thẻ. Bảng dưới đây sẽ lấy dữ liệu từ hồ sơ đã lưu, không tạo chỉ số hay năng lực giả.</p><a href="#/" class="button button-primary">Chọn hồ sơ để đối chiếu</a></div>${entities.length?`<div class="section-head"><h2 class="section-title">Đã chọn ${entities.length} hồ sơ</h2><button class="button button-ghost button-small" data-action="clear-compare">Xóa lựa chọn</button></div>${entities.map(e=>`<div class="history-row"><img src="${esc(e.image)}" alt="${esc(e.imageAlt)}"><div class="history-row-main"><strong>${esc(e.name)}</strong><small>${esc(e.region)} · ${esc(classShort(e.classification))}</small></div><button class="button button-ghost button-small" data-action="compare-toggle" data-id="${esc(e.id)}">Bỏ chọn ×</button></div>`).join('')}`:''}`;
    const fields=[['Phân loại',e=>e.classification],['Khu vực',e=>e.region],['Văn hóa / truyền thống',e=>e.culture],['Nguồn gốc',e=>e.origin],['Đặc điểm nhận dạng',e=>e.appearance],['Năng lực được kể lại',e=>e.abilities],['Môi trường xuất hiện',e=>e.habitat],['Câu chuyện / bối cảnh',e=>e.stories],['Giới hạn kiểm chứng',e=>e.limits],['Nguồn tham khảo',e=>e.sources.length?`${e.sources.length} nguồn: ${e.sources.map(s=>s.title).join('; ')}`:'Chưa có nguồn độc lập đủ mạnh trong bộ dữ liệu mẫu']];
    const first=entities[0];
    const similarity=`${entities.length} hồ sơ đang được đối chiếu. ${new Set(entities.map(e=>e.region)).size===1?'Các hồ sơ cùng khu vực địa lý.':'Các hồ sơ thuộc nhiều khu vực địa lý.'} ${new Set(entities.map(e=>e.classification)).size===1?'Các hồ sơ cùng nhóm phân loại.':'Các hồ sơ khác nhóm phân loại.'} Đây là phép so sánh mô tả trên dữ liệu hồ sơ, không phải đánh giá sức mạnh khách quan.`;
    return `<div class="page-heading"><div><div class="eyebrow">CROSS-REFERENCE / 04</div><h1>Bảng đối chiếu</h1><p>Đối chiếu ${entities.length} hồ sơ — chỉ dùng thông tin đã lưu trong cơ sở dữ liệu cục bộ.</p></div><div class="heading-symbol">⇄</div></div><div class="diff-callout">${esc(similarity)}</div><div class="section-head"><div><h2 class="section-title">Ma trận so sánh</h2><p class="section-subtitle">Cuộn ngang trên màn hình nhỏ để xem đủ các cột.</p></div><button class="button button-ghost button-small" data-action="clear-compare">Xóa lựa chọn</button></div><div class="compare-table-wrap"><table class="compare-table"><thead><tr><th>THUỘC TÍNH</th>${entities.map(e=>`<th><div class="compare-head"><img src="${esc(e.image)}" alt="${esc(e.imageAlt)}"><span><strong>${esc(e.name)}</strong><small>${esc(e.region)}</small></span></div></th>`).join('')}</tr></thead><tbody>${fields.map(([label,get])=>`<tr><td>${esc(label)}</td>${entities.map(e=>`<td>${esc(get(e))}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  }
  function entityForm(entity=null) {
    const e=entity||{id:'',name:'',aliases:[],classification:'Truyền thuyết dân gian',category:'',region:'Việt Nam',culture:'Chưa xác định',origin:'',prevalence:3,summary:'',appearance:'',abilities:'',habitat:'',stories:'',limits:'',tags:[],image:'',imageAlt:'Minh họa do người đóng góp cung cấp',sources:[]};
    const sourceText=e.sources.map(s=>`${s.title} | ${s.url} | ${s.note}`).join('\n');
    return `<div class="page-heading"><div><div class="eyebrow">${entity?'EDIT RECORD / 05':'NEW RECORD / 05'}</div><h1>${entity?'Chỉnh sửa hồ sơ':'Đóng góp hồ sơ mới'}</h1><p>${entity?'Cập nhật nội dung trong bộ dữ liệu cục bộ của trình duyệt.':'Tạo một bản ghi mới. Dữ liệu chỉ tồn tại trên thiết bị này cho đến khi bạn xuất/chuyển JSON.'}</p></div><div class="heading-symbol">✎</div></div>
      <div class="form-layout"><form class="form-panel" id="entityForm" novalidate data-edit-id="${esc(entity?entity.id:'')}"><h2>Thông tin hồ sơ</h2><p class="form-intro">Các trường có dấu * là bắt buộc. Không nhập HTML hoặc mã thực thi vào các trường nội dung.</p><div class="form-grid">
      <div class="field"><label for="fName">Tên thực thể <span class="required">*</span></label><input id="fName" name="name" required maxlength="100" value="${esc(e.name)}" placeholder="Ví dụ: Bóng đè"></div>
      <div class="field"><label for="fClass">Phân loại nguồn gốc <span class="required">*</span></label><select id="fClass" name="classification" required>${CLASSES.map(c=>`<option ${e.classification===c?'selected':''} value="${esc(c)}">${esc(c)}</option>`).join('')}</select><small>Chọn theo nguồn gốc/tính chất của hồ sơ, không theo mức độ đáng sợ.</small></div>
      <div class="field"><label for="fAliases">Tên gọi khác</label><input id="fAliases" name="aliases" maxlength="300" value="${esc(e.aliases.join(', '))}" placeholder="Tên khác, cách viết khác"><small>Phân cách các tên bằng dấu phẩy.</small></div>
      <div class="field"><label for="fRegion">Khu vực văn hóa <span class="required">*</span></label><select id="fRegion" name="region" required>${REGIONS.map(r=>`<option ${e.region===r?'selected':''} value="${esc(r)}">${esc(r)}</option>`).join('')}</select></div>
      <div class="field"><label for="fCategory">Nhóm / thể loại <span class="required">*</span></label><input id="fCategory" name="category" required maxlength="100" value="${esc(e.category)}" placeholder="Ví dụ: Truyền thuyết đô thị"></div>
      <div class="field"><label for="fCulture">Văn hóa / truyền thống</label><input id="fCulture" name="culture" maxlength="100" value="${esc(e.culture||'Chưa xác định')}" placeholder="Ví dụ: Dân gian Việt Nam, folklore Algonquian"><small>Nếu chưa đủ tư liệu, ghi “Chưa xác định” thay vì suy đoán.</small></div>
      <div class="field"><label for="fOrigin">Nguồn gốc / bối cảnh <span class="required">*</span></label><input id="fOrigin" name="origin" required maxlength="220" value="${esc(e.origin)}" placeholder="Nơi, thời kỳ hoặc tác phẩm xuất hiện"></div>
      <div class="field full"><label for="fSummary">Mô tả ngắn <span class="required">*</span></label><textarea id="fSummary" name="summary" required maxlength="500" rows="3" placeholder="Tóm tắt trung lập, phân biệt mô tả và bằng chứng…">${esc(e.summary)}</textarea></div>
      <div class="field full"><label for="fAppearance">Đặc điểm nhận dạng</label><textarea id="fAppearance" name="appearance" maxlength="1800" rows="3" placeholder="Ghi rõ dị bản nếu mô tả không thống nhất…">${esc(e.appearance)}</textarea></div>
      <div class="field full"><label for="fAbilities">Năng lực được mô tả / đồn kể</label><textarea id="fAbilities" name="abilities" maxlength="1800" rows="3" placeholder="Dùng cách diễn đạt ‘trong truyện kể…’, ‘theo dị bản…’">${esc(e.abilities)}</textarea></div>
      <div class="field full"><label for="fHabitat">Môi trường xuất hiện</label><textarea id="fHabitat" name="habitat" maxlength="1200" rows="2">${esc(e.habitat)}</textarea></div>
      <div class="field full"><label for="fStories">Câu chuyện liên quan / lịch sử hình thành</label><textarea id="fStories" name="stories" maxlength="2500" rows="4">${esc(e.stories)}</textarea></div>
      <div class="field full"><label for="fLimits">Giới hạn kiểm chứng <span class="required">*</span></label><textarea id="fLimits" name="limits" required maxlength="1800" rows="3" placeholder="Nguồn nào chưa có? Điều gì là hư cấu? Có giới hạn nào cần lưu ý?">${esc(e.limits)}</textarea></div>
      <div class="field"><label for="fTags">Từ khóa</label><input id="fTags" name="tags" maxlength="500" value="${esc(e.tags.join(', '))}" placeholder="rừng, truyền miệng, văn học"><small>Phân cách bằng dấu phẩy.</small></div>
      <div class="field"><label for="fPopularity">Độ phổ biến trong văn hóa đại chúng</label><select id="fPopularity" name="prevalence">${[1,2,3,4,5].map(n=>`<option value="${n}" ${e.prevalence===n?'selected':''}>${n} / 5</option>`).join('')}</select><small>Đánh giá biên tập chủ quan, không phải thống kê.</small></div>
      <div class="field full"><label for="fImage">Đường dẫn ảnh / minh họa</label><input id="fImage" name="image" maxlength="500" value="${esc(e.image)}" placeholder="assets/ten-minh-hoa.svg hoặc https://…"><small>Chỉ chấp nhận ảnh SVG nội bộ trong thư mục assets hoặc URL HTTPS. Hãy bảo đảm quyền sử dụng ảnh.</small></div>
      <div class="field full"><label for="fImageAlt">Mô tả ảnh (alt text)</label><input id="fImageAlt" name="imageAlt" maxlength="250" value="${esc(e.imageAlt)}"></div>
      <div class="field full"><label for="fSources">Nguồn tham khảo (mỗi dòng một nguồn)</label><textarea id="fSources" name="sources" rows="4" maxlength="6000" placeholder="Tên nguồn | https://example.org/bai-viet | Ghi chú về nguồn">${esc(sourceText)}</textarea><small>Định dạng từng dòng: <code>Tên nguồn | URL HTTPS | Ghi chú</code>. Không thêm nguồn nếu chưa kiểm tra được.</small></div>
      </div><div class="form-actions"><a href="${entity?`#/entity/${encodeURIComponent(entity.id)}`:'#/'}" class="button button-ghost">Hủy</a><button type="submit" class="button button-primary">${entity?'Lưu thay đổi':'＋ Tạo hồ sơ'}</button></div></form>
      <aside class="guide-panel"><h2>Quy tắc biên tập</h2><p>Chất lượng hồ sơ quan trọng hơn số lượng chi tiết kinh dị.</p><div class="guide-step"><span class="guide-num">01</span><div><strong>Tách biệt thể loại</strong><p>Đánh dấu truyền thuyết, thần thoại, nhân vật hư cấu hay tài liệu chưa xác minh.</p></div></div><div class="guide-step"><span class="guide-num">02</span><div><strong>Viết có điều kiện</strong><p>Dùng “theo lời kể”, “trong tác phẩm”, “một số dị bản” thay vì trình bày lời đồn như sự thật.</p></div></div><div class="guide-step"><span class="guide-num">03</span><div><strong>Kiểm tra nguồn</strong><p>Liên kết phải dùng HTTPS; ghi rõ nếu nguồn là báo chí, nghiên cứu, tư liệu gốc hay văn hóa đại chúng.</p></div></div><div class="guide-step"><span class="guide-num">04</span><div><strong>Không dùng ảnh tùy tiện</strong><p>Ưu tiên hình tự tạo, tài nguyên có giấy phép rõ ràng hoặc ảnh minh họa; thêm mô tả thay thế.</p></div></div><div class="notice" style="margin-top:16px"><strong>Lưu ý:</strong> Chỉnh sửa/xóa chỉ tác động đến dữ liệu lưu cục bộ. Hãy xuất JSON nếu cần bản sao trước khi thử nghiệm.</div></aside></div>`;
  }
  function notFoundPage() { return `<div class="route-error"><div class="eyebrow">404 / UNKNOWN ROUTE</div><h1>Trang này chưa có trong hồ sơ</h1><p>Đường dẫn không hợp lệ hoặc trang đã được chuyển.</p><a href="#/" class="button button-primary">Về thư viện</a></div>`; }

  function render() {
    const route=parseRoute();
    $$('.top-nav [data-nav], .sidebar [data-nav]').forEach(a=>a.classList.toggle('active', a.dataset.nav===route.page || (route.page==='edit'&&a.dataset.nav==='contribute') || (route.page==='entity'&&a.dataset.nav==='home')));
    $('#favoriteNavCount').textContent=String(state.favorites.length);
    if(route.page==='home') { main.innerHTML=homePage(); }
    else if(route.page==='favorites') { main.innerHTML=favoritesPage(); }
    else if(route.page==='history') { main.innerHTML=historyPage(); }
    else if(route.page==='entity') { main.innerHTML=renderEntityDetail(route.id); }
    else if(route.page==='compare') { main.innerHTML=comparePage(); }
    else if(route.page==='contribute') { view.activeTab='overview'; main.innerHTML=entityForm(); }
    else if(route.page==='edit') { const entity=getEntity(route.id); main.innerHTML=entity?entityForm(entity):notFoundPage(); }
    else { main.innerHTML=notFoundPage(); }
    $('#compareDock').hidden=state.compareIds.length===0;
    $('#compareDockCount').textContent=String(state.compareIds.length);
    // Keep search and filter settings visible when navigating between the main library views.
    bindPageEvents();
  }
  function renderResultsOnly() {
    const section=$('#resultsSection'); if(!section) return;
    const mode=parseRoute().page==='favorites'?'favorites':'home';
    section.innerHTML=resultsGrid(mode);
    bindCommonActions(section);
  }
  function syncPersistentViewSettings() {
    state.settings={...state.settings,sort:view.sort,classification:view.classification,region:view.region,category:view.category,culture:view.culture,query:view.query}; saveState();
  }
  function resetFilters() { view.query='';view.classification='';view.region='';view.culture='';view.category='';view.sort='popular';syncPersistentViewSettings();render(); }
  function toggleFavorite(id) {
    if(!getEntity(id)) return;
    if(state.favorites.includes(id)) { state.favorites=state.favorites.filter(x=>x!==id); toast('Đã bỏ yêu thích',getEntity(id).name); }
    else { state.favorites.push(id); toast('Đã lưu yêu thích',getEntity(id).name); }
    saveState(); render();
  }
  function toggleCompare(id) {
    if(!getEntity(id)) return;
    if(state.compareIds.includes(id)) state.compareIds=state.compareIds.filter(x=>x!==id);
    else { if(state.compareIds.length>=4) { toast('Đã đạt giới hạn','Bảng đối chiếu hỗ trợ tối đa 4 hồ sơ để dễ đọc.','error'); return; } state.compareIds.push(id); }
    saveState(); render();
  }
  function openEntity(id) { if(!getEntity(id)) { toast('Không tìm thấy hồ sơ','Hồ sơ có thể đã bị xóa.','error'); return; } lastRecordedRoute=''; navigate(`#/entity/${encodeURIComponent(id)}`); }
  function confirmDelete(id) {
    const e=getEntity(id); if(!e)return;
    const okay=window.confirm(`Xóa hồ sơ “${e.name}” khỏi dữ liệu cục bộ? Thao tác này không thể hoàn tác nếu chưa xuất JSON.`);
    if(!okay)return;
    state.entities=state.entities.filter(x=>x.id!==id);state.favorites=state.favorites.filter(x=>x!==id);state.history=state.history.filter(x=>x!==id);state.compareIds=state.compareIds.filter(x=>x!==id);saveState();toast('Đã xóa hồ sơ',e.name);navigate('#/');
  }
  function bindCommonActions(root=document) {
    $$('[data-action="favorite"]',root).forEach(el=>el.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();toggleFavorite(el.dataset.id);}));
    $$('[data-action="detail"]',root).forEach(el=>el.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();openEntity(el.dataset.id);}));
    $$('[data-action="compare-toggle"]',root).forEach(el=>el.addEventListener('change',e=>{toggleCompare(el.dataset.id);e.stopPropagation();}));
    $$('[data-action="compare-toggle"]:not(input)',root).forEach(el=>el.addEventListener('click',e=>{e.preventDefault();toggleCompare(el.dataset.id);}));
    $$('[data-action="reset-filters"]',root).forEach(el=>el.addEventListener('click',resetFilters));
    $$('[data-action="delete-entity"]',root).forEach(el=>el.addEventListener('click',()=>confirmDelete(el.dataset.id)));
    $$('[data-action="clear-history"]',root).forEach(el=>el.addEventListener('click',()=>{if(window.confirm('Xóa toàn bộ lịch sử khám phá trên thiết bị này?')){state.history=[];saveState();toast('Đã xóa lịch sử');render();}}));
    $$('[data-action="clear-compare"]',root).forEach(el=>el.addEventListener('click',()=>{state.compareIds=[];saveState();render();toast('Đã bỏ toàn bộ lựa chọn');}));
  }
  function bindPageEvents() {
    bindCommonActions(main);
    const search=$('#entitySearch');
    if(search) {
      search.addEventListener('input',()=>{view.query=search.value;syncPersistentViewSettings();renderResultsOnly();});
      search.addEventListener('keydown',e=>{if(e.key==='Escape'){search.value='';view.query='';syncPersistentViewSettings();renderResultsOnly();}});
    }
    const classFilter=$('#classFilter');if(classFilter)classFilter.addEventListener('change',()=>{view.classification=classFilter.value;syncPersistentViewSettings();renderResultsOnly();});
    const regionFilter=$('#regionFilter');if(regionFilter)regionFilter.addEventListener('change',()=>{view.region=regionFilter.value;syncPersistentViewSettings();renderResultsOnly();});
    const categoryFilter=$('#categoryFilter');if(categoryFilter)categoryFilter.addEventListener('change',()=>{view.category=categoryFilter.value;syncPersistentViewSettings();renderResultsOnly();});
    const cultureFilter=$('#cultureFilter');if(cultureFilter)cultureFilter.addEventListener('change',()=>{view.culture=cultureFilter.value;syncPersistentViewSettings();renderResultsOnly();});
    const sortFilter=$('#sortFilter');if(sortFilter)sortFilter.addEventListener('change',()=>{view.sort=sortFilter.value;syncPersistentViewSettings();renderResultsOnly();});
    $$('[data-tab]',main).forEach(btn=>btn.addEventListener('click',()=>{view.activeTab=btn.dataset.tab;render();}));
    const form=$('#entityForm');if(form)form.addEventListener('submit',submitEntityForm);
  }
  function submitEntityForm(event) {
    event.preventDefault(); const form=event.currentTarget; const fd=new FormData(form); const editingId=form.dataset.editId||'';
    const existing=editingId?getEntity(editingId):null;
    const name=String(fd.get('name')||'').trim(); const category=String(fd.get('category')||'').trim(); const origin=String(fd.get('origin')||'').trim(); const summary=String(fd.get('summary')||'').trim(); const limits=String(fd.get('limits')||'').trim();
    if(!name||!category||!origin||!summary||!limits) { toast('Thiếu trường bắt buộc','Hãy điền tên, phân loại, khu vực, nhóm, nguồn gốc, mô tả và giới hạn kiểm chứng.','error'); return; }
    const rawImage=String(fd.get('image')||'').trim(); const image=rawImage||'assets/slender-man.svg';
    if(!validImage(image)) { toast('Đường dẫn ảnh không hợp lệ','Chỉ chấp nhận tệp SVG trong assets/ hoặc URL bắt đầu bằng HTTPS.','error');return; }
    const sourceLines=String(fd.get('sources')||'').split(/\r?\n/).map(x=>x.trim()).filter(Boolean); const sources=[];
    for(let i=0;i<sourceLines.length;i++) {
      const parts=sourceLines[i].split('|').map(x=>x.trim());
      if(parts.length<2||!parts[0]||!validUrl(parts[1])) { toast('Nguồn tham khảo chưa hợp lệ',`Dòng ${i+1}: cần “Tên nguồn | URL HTTPS | Ghi chú”.`,'error');return; }
      sources.push({title:parts[0].slice(0,180),url:parts[1],note:(parts.slice(2).join(' | ')||'').slice(0,500)});
    }
    const id=existing?existing.id:slugify(name);
    if(!id) { toast('Tên chưa hợp lệ','Hãy nhập tên có ít nhất một ký tự chữ hoặc số.','error');return; }
    if(!existing && state.entities.some(e=>e.id===id)) { toast('Hồ sơ bị trùng','Tên này tạo ra mã hồ sơ đã tồn tại. Hãy chỉnh tên hoặc sửa hồ sơ có sẵn.','error');return; }
    const imageAlt=String(fd.get('imageAlt')||'Minh họa thực thể').trim();
    const entity=normalizeEntity({id,name,aliases:String(fd.get('aliases')||'').split(',').map(x=>x.trim()).filter(Boolean).slice(0,20),classification:String(fd.get('classification')||'Tư liệu truyền miệng'),category,region:String(fd.get('region')||'Khác'),culture:String(fd.get('culture')||'Chưa xác định').trim()||'Chưa xác định',origin,prevalence:Number(fd.get('prevalence')||3),summary,appearance:String(fd.get('appearance')||'').trim(),abilities:String(fd.get('abilities')||'').trim(),habitat:String(fd.get('habitat')||'').trim(),stories:String(fd.get('stories')||'').trim(),limits,tags:String(fd.get('tags')||'').split(',').map(x=>x.trim()).filter(Boolean).slice(0,40),image,imageAlt,sources,createdAt:existing?existing.createdAt:nowIso(),updatedAt:nowIso(),builtIn:existing?existing.builtIn:false});
    if(!entity.name||entity.name.length>100||entity.culture.length>100||entity.summary.length>500) { toast('Dữ liệu vượt giới hạn','Hãy kiểm tra lại tên và mô tả ngắn.','error');return; }
    if(existing) state.entities=state.entities.map(e=>e.id===id?entity:e); else state.entities.unshift(entity);
    if(saveState()) { toast(existing?'Đã cập nhật hồ sơ':'Đã tạo hồ sơ',entity.name); view.query='';view.classification='';view.region='';view.culture='';view.category='';view.sort='popular';view.activeTab='overview';syncPersistentViewSettings();navigate(`#/entity/${encodeURIComponent(id)}`); }
  }
  function exportJson() {
    const payload={app:'Ho So Di The',schemaVersion:1,exportedAt:nowIso(),entities:state.entities,favorites:state.favorites,history:state.history,compareIds:state.compareIds,settings:state.settings};
    const blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json;charset=utf-8'}); const url=URL.createObjectURL(blob); const a=document.createElement('a');a.href=url;a.download=`ho-so-di-the-${new Date().toISOString().slice(0,10)}.json`;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);toast('Đã xuất dữ liệu JSON',`${state.entities.length} hồ sơ được đóng gói để sao lưu.`);
  }
  function validateImportedPayload(parsed) {
    if(!parsed||typeof parsed!=='object'||!Array.isArray(parsed.entities)) throw new Error('JSON phải là một đối tượng có mảng “entities”.');
    if(parsed.schemaVersion!==undefined && Number(parsed.schemaVersion)!==1) throw new Error('Phiên bản JSON chưa được hỗ trợ. Phiên bản hiện tại là 1.');
    if(parsed.entities.length>1000) throw new Error('Tối đa 1.000 hồ sơ cho mỗi lần nhập.');
    const seen=new Set(); const entities=[];
    for(let i=0;i<parsed.entities.length;i++) {
      const raw=parsed.entities[i]; if(!isEntityShape(raw)) throw new Error(`Hồ sơ ở vị trí ${i+1} thiếu mã hoặc tên.`);
      const id=String(raw.id); if(!/^[a-z0-9][a-z0-9-]{0,59}$/.test(id)) throw new Error(`Mã hồ sơ ở vị trí ${i+1} không hợp lệ.`);
      if(seen.has(id)) throw new Error(`Mã hồ sơ bị trùng: ${id}.`); seen.add(id);
      if(!String(raw.name).trim()||String(raw.name).length>100) throw new Error(`Tên hồ sơ ${id} trống hoặc quá dài.`);
      if(raw.image && !validImage(raw.image)) throw new Error(`Đường dẫn ảnh của hồ sơ ${id} không hợp lệ (chỉ SVG assets/ hoặc HTTPS).`);
      if(raw.sources!==undefined&&!Array.isArray(raw.sources)) throw new Error(`Nguồn tham khảo của ${id} phải là một mảng.`);
      if(raw.sources && raw.sources.length>30) throw new Error(`Hồ sơ ${id} có quá 30 nguồn tham khảo.`);
      if(raw.sources) for(const source of raw.sources) {
        if(!source || typeof source.title!=='string' || !source.title.trim() || source.title.length>180 || typeof source.url!=='string' || source.url.length>2048 || !validUrl(source.url) || (source.note!==undefined && String(source.note).length>500)) throw new Error(`Nguồn tham khảo của ${id} có tên trống, vượt giới hạn hoặc URL không phải HTTPS.`);
      }
      if(raw.classification && !CLASSES.includes(raw.classification)) throw new Error(`Phân loại của hồ sơ ${id} không nằm trong danh mục hỗ trợ.`);
      if(raw.region && !REGIONS.includes(raw.region)) throw new Error(`Khu vực của hồ sơ ${id} không nằm trong danh mục hỗ trợ.`);
      const normalized=normalizeEntity(raw);
      const limits={name:100,category:100,culture:100,origin:220,summary:500,appearance:1800,abilities:1800,habitat:1200,stories:2500,limits:1800,imageAlt:250};
      for(const [field,max] of Object.entries(limits)) if(String(normalized[field]||'').length>max) throw new Error(`Trường ${field} của hồ sơ ${id} vượt giới hạn ${max} ký tự.`);
      if(normalized.tags.length>40 || normalized.aliases.length>20 || normalized.tags.some(tag=>tag.length>80) || normalized.aliases.some(alias=>alias.length>100)) throw new Error(`Hồ sơ ${id} có quá nhiều từ khóa/tên gọi khác hoặc một mục vượt giới hạn ký tự.`);
      entities.push(normalized);
    }
    const ids=new Set(entities.map(e=>e.id));
    const filteredIds=(arr)=>Array.isArray(arr)?[...new Set(arr.filter(id=>typeof id==='string'&&ids.has(id)))]:[];
    const settings=parsed.settings&&typeof parsed.settings==='object'?parsed.settings:{};
    return {schemaVersion:1,entities,favorites:filteredIds(parsed.favorites),history:filteredIds(parsed.history).slice(0,40),compareIds:filteredIds(parsed.compareIds).slice(0,4),settings:{sort:['popular','name','newest','oldest'].includes(settings.sort)?settings.sort:'popular',classification:CLASSES.includes(settings.classification)?settings.classification:'',region:REGIONS.includes(settings.region)?settings.region:'',category:typeof settings.category==='string'&&entities.some(e=>e.category===settings.category)?settings.category:'',culture:typeof settings.culture==='string'&&entities.some(e=>e.culture===settings.culture)?settings.culture:'',query:typeof settings.query==='string'?settings.query.slice(0,200):''}};
  }
  async function importJsonFile(file) {
    if(!file) return;
    if(file.size>5*1024*1024) { toast('Tệp quá lớn','Giới hạn tệp JSON là 5 MB.','error');return; }
    try {
      const textContent=await file.text();let parsed;try{parsed=JSON.parse(textContent);}catch{throw new Error('Tệp không phải JSON hợp lệ.');}
      const incoming=validateImportedPayload(parsed);
      const confirmation=window.confirm(`Nhập ${incoming.entities.length} hồ sơ cùng danh sách yêu thích/lịch sử? Dữ liệu hiện tại sẽ được thay thế. Hãy xuất JSON trước nếu cần giữ bản sao.`);
      if(!confirmation)return;
      const previous=state;state=incoming;
      if(!saveState()) { state=previous;return; }
      view={query:state.settings.query||'',classification:state.settings.classification||'',region:state.settings.region||'',culture:state.settings.culture||'',category:state.settings.category||'',sort:state.settings.sort||'popular',activeTab:'overview'};lastRecordedRoute='';toast('Nhập dữ liệu thành công',`${state.entities.length} hồ sơ đã được nạp và kiểm tra.`);navigate('#/');
    } catch(error) { toast('Không thể nhập dữ liệu',error.message||'Tệp JSON không đúng định dạng.','error'); }
    finally { $('#importFile').value=''; }
  }
  function formatDate(value) { const date=new Date(value); if(Number.isNaN(date.getTime())) return 'Không rõ'; return new Intl.DateTimeFormat('vi-VN',{day:'2-digit',month:'2-digit',year:'numeric'}).format(date); }
  function bindGlobalEvents() {
    $('#exportBtn').addEventListener('click',exportJson);
    $('#importBtn').addEventListener('click',()=>$('#importFile').click());
    $('#importFile').addEventListener('change',e=>importJsonFile(e.target.files&&e.target.files[0]));
    $('#openCompareBtn').addEventListener('click',()=>navigate('#/compare'));
    $('#clearCompareBtn').addEventListener('click',()=>{state.compareIds=[];saveState();render();toast('Đã bỏ lựa chọn đối chiếu');});
    $('#menuToggle').addEventListener('click',()=>{const open=$('#sidebar').classList.toggle('open');$('#menuToggle').setAttribute('aria-expanded',String(open));});
    $$('.category-link').forEach(button=>button.addEventListener('click',()=>{view.classification=button.dataset.filterClass;view.query='';view.region='';view.culture='';view.category='';view.sort='popular';syncPersistentViewSettings();if(currentHash()!=='#/')navigate('#/');else render();if(window.innerWidth<=900){$('#sidebar').classList.remove('open');}}));
    window.addEventListener('hashchange',()=>{const route=parseRoute();if(route.page!=='entity')lastRecordedRoute='';render();$('#sidebar').classList.remove('open');$('#menuToggle').setAttribute('aria-expanded','false');});
    window.addEventListener('keydown',event=>{if(event.key==='/'&&!['INPUT','TEXTAREA','SELECT'].includes(document.activeElement?.tagName)){const search=$('#entitySearch');if(search){event.preventDefault();search.focus();}}if(event.key==='Escape'){if($('#sidebar').classList.contains('open')){$('#sidebar').classList.remove('open');$('#menuToggle').setAttribute('aria-expanded','false');}}});
  }
  function validateStateOnStartup() {
    const known=new Set(state.entities.map(e=>e.id));
    state.favorites=[...new Set(state.favorites.filter(id=>known.has(id)))];state.history=[...new Set(state.history.filter(id=>known.has(id)))].slice(0,40);state.compareIds=[...new Set(state.compareIds.filter(id=>known.has(id)))].slice(0,4);
    view.sort=['popular','name','newest','oldest'].includes(state.settings.sort)?state.settings.sort:'popular';view.query=typeof state.settings.query==='string'?state.settings.query:'';view.classification=CLASSES.includes(state.settings.classification)?state.settings.classification:'';view.region=REGIONS.includes(state.settings.region)?state.settings.region:'';view.culture=typeof state.settings.culture==='string'&&state.entities.some(e=>e.culture===state.settings.culture)?state.settings.culture:'';view.category=typeof state.settings.category==='string'&&state.entities.some(e=>e.category===state.settings.category)?state.settings.category:'';saveState();
  }
  validateStateOnStartup();bindGlobalEvents();render();
})();
